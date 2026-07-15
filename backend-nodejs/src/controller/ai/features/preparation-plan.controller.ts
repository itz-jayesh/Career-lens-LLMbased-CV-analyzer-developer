import Get_Random_Gemini_Key from "../../../functions/Get_Random_Gemini_Key";
import AI_Prompt from "../../../prompt/AI_Prompt";
import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import Preparation_Plan_Model from "../../../models/new-features/Preparation_Plan.model";


export default async function Generate_Preparation_Plan_Controller(req: Request, res: Response) {
    const { time, jobDescription } = req.body;

    try {
        const prompt: string = AI_Prompt.Generate_Preparation_Plan(jobDescription);
        const { apiKey, model } = Get_Random_Gemini_Key();
        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: { responseMimeType: "text/plain" }
        });

        const r = response.text;

        const newData = new Preparation_Plan_Model({
            detailedPrompt: prompt,
            jobDescription,
            time,
            responseFromAi: r
        });

        await newData.save();

        res.status(200).json({
            success: true,
            data: r,
            message: "Preparation Plan Generated"
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