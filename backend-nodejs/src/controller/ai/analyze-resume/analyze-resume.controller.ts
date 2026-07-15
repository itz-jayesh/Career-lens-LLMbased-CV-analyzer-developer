import Clean_Confidential_Credentials from "../../../functions/Clean_Confidential_Credentials";
import Get_Random_Gemini_Key from "../../../functions/Get_Random_Gemini_Key";
import Analyze_Resume_Model from "../../../models/Analyze_Resume.model";
import AI_Prompt from "../../../prompt/AI_Prompt";
import { GoogleGenAI } from "@google/genai";
import { Request, Response } from "express";

export default async function Analyze_Resume(req: Request, res: Response) {
    const { jobDescription, resumeData, time, email, section } = req.body;

    const jd = Clean_Confidential_Credentials(jobDescription);
    const rd = Clean_Confidential_Credentials(resumeData);

    try {
        let detailedPrompt = "";

        if (section === "missing-skills")
            detailedPrompt = AI_Prompt.Analyze_Resume_Missing_Skills(jd, rd)
        else if (section === "ats-match")
            detailedPrompt = AI_Prompt.Analyze_Resume_ATS_Match(jd, rd)
        else if (section === "improve-my-resume")
            detailedPrompt = AI_Prompt.Analyze_Resume_Improve_My_Resume(jd, rd)
        else {
            res.status(200).json({ success: false, message: "invalid section value choosed." });
            return;
        }

        const { apiKey, model } = Get_Random_Gemini_Key();

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model,
            contents: detailedPrompt
        });

        let textMessage = "No data received";
        if (Array.isArray(response.candidates) &&
            response.candidates[0].content &&
            response.candidates[0].content.parts &&
            response.candidates[0].content.parts[0] &&
            response.candidates[0].content.parts[0].text) {
            textMessage = response.candidates[0].content.parts[0].text;
        }

        const newData = new Analyze_Resume_Model({
            jobDescription,
            resumeData,
            email: email ? email : "none",
            time,
            detailedPrompt,
            section,
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
            message: "Response from AI."
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