import Technical_Questions_Model from "../../../models/new-features/Technical_Questions.model";
import Get_Random_Gemini_Key from "../../../functions/Get_Random_Gemini_Key";
import { zodToJsonSchema } from "zod-to-json-schema";
import AI_Prompt from "../../../prompt/AI_Prompt";
import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const questionSchema = z.object({
    title: z.string(),
    answer: z.string()
});

const technicalQuestionsSchema = z.object({
    title: z.string(),
    questions: z.array(questionSchema)
});

export default async function Generate_Technical_Questions_Controller(req: Request, res: Response) {
    const { time, jobDescription } = req.body;

    try {
        const prompt: string = AI_Prompt.Generate_Technical_Questions(jobDescription);
        const { apiKey, model } = Get_Random_Gemini_Key();
        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseSchema: zodToJsonSchema(technicalQuestionsSchema as any),
                responseMimeType: "application/json",
                // responseJsonSchema: zodToJsonSchema(technicalQuestionsSchema as any)
            }
        });

        const a = JSON.parse(response.text || "{}");
        const questions = [];
        const titles = []
        const answers = []

        if (Array.isArray(a.questions)) {
            for (let i = 0; i < a.questions.length; i++) {
                if (a.questions[i] === "title") {
                    titles.push(a.questions[i]);
                    if (a.questions[i + 1])
                        titles.push(a.questions[i + 1]);
                }
                if (a.questions[i] === "answer") {
                    answers.push(a.questions[i]);
                    if (a.questions[i + 1])
                        answers.push(a.questions[i + 1]);
                }
            }
        }

        if (titles.length === answers.length) {
            for (let i = 0; i < titles.length; i++) {
                if (titles[i] === "title" || answers[i] === "answer")
                    continue;
                questions.push({
                    title: titles[i],
                    answer: answers[i]
                });
            }
        }

        const newData = new Technical_Questions_Model({
            detailedPrompt: prompt,
            jobDescription,
            time,
            responseFromAi: {
                title: a.title,
                questions: questions,
            }
        });

        await newData.save();

        res.status(200).json({
            success: true,
            data: questions,
            message: "Technical Questions Generated"
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