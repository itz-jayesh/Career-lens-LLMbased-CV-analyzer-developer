import GenerateResumeConversation_Model from "../../../models/GenerateResumeConversation.model";
import Get_Random_Gemini_Key from "../../../functions/Get_Random_Gemini_Key";
import AI_Prompt from "../../../prompt/AI_Prompt";
import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import Clean_Confidential_Credentials from "../../../functions/Clean_Confidential_Credentials";


export default async function AI_Get_Suggestions(req: Request, res: Response) {
    const { template, section, data, userPrompt, sessionId, email } = req.body;

    const uPrompt = Clean_Confidential_Credentials(userPrompt);

    try {
        const detailedPrompt = AI_Prompt.Generate_Resume_Get_Suggestion(data, section, uPrompt);

        const { apiKey, model } = Get_Random_Gemini_Key();
        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model, contents: detailedPrompt
        });

        let textMessage = "No data received";
        if (Array.isArray(response.candidates) &&
            response.candidates[0].content &&
            response.candidates[0].content.parts &&
            response.candidates[0].content.parts[0] &&
            response.candidates[0].content.parts[0].text) {
            textMessage = response.candidates[0].content.parts[0].text;
        }

        const newData = new GenerateResumeConversation_Model({
            template,
            section,
            data,
            userPrompt,
            detailedPrompt,
            sessionId,
            email,
            response: {
                text: textMessage,
                promptTokenCount: response.usageMetadata?.promptTokenCount || 0,
                candidatesTokenCount: response.usageMetadata?.candidatesTokenCount || 0,
                model: response.modelVersion,
                responseId: response.responseId
            }
        });

        await newData.save();

        res.status(200).json({
            success: true,
            text: textMessage,
            message: "Suggestion from AI."
        });
        return;
    } catch (error: any) {
        if (error.name === "ApiError" && error.status === 400) {
            res.status(200).json({ success: false, message: "Invalid API key." });
        }
        else if (error.name === "ApiError" && error.status === 429) {
            res.status(200).json({ success: false, message: "API has exhausted please try after some time." });
        }
        else {
            res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
        }
        return;
    }
}