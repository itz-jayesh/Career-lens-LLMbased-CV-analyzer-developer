"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Generate_Technical_Questions_Controller;
const Technical_Questions_model_1 = __importDefault(require("../../../models/new-features/Technical_Questions.model"));
const Get_Random_Gemini_Key_1 = __importDefault(require("../../../functions/Get_Random_Gemini_Key"));
const zod_to_json_schema_1 = require("zod-to-json-schema");
const AI_Prompt_1 = __importDefault(require("../../../prompt/AI_Prompt"));
const genai_1 = require("@google/genai");
const zod_1 = require("zod");
const questionSchema = zod_1.z.object({
    title: zod_1.z.string(),
    answer: zod_1.z.string()
});
const technicalQuestionsSchema = zod_1.z.object({
    title: zod_1.z.string(),
    questions: zod_1.z.array(questionSchema)
});
function Generate_Technical_Questions_Controller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { time, jobDescription } = req.body;
        try {
            const prompt = AI_Prompt_1.default.Generate_Technical_Questions(jobDescription);
            const { apiKey, model } = (0, Get_Random_Gemini_Key_1.default)();
            const ai = new genai_1.GoogleGenAI({ apiKey });
            const response = yield ai.models.generateContent({
                model,
                contents: prompt,
                config: {
                    responseSchema: (0, zod_to_json_schema_1.zodToJsonSchema)(technicalQuestionsSchema),
                    responseMimeType: "application/json",
                    // responseJsonSchema: zodToJsonSchema(technicalQuestionsSchema as any)
                }
            });
            const a = JSON.parse(response.text || "{}");
            const questions = [];
            const titles = [];
            const answers = [];
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
            const newData = new Technical_Questions_model_1.default({
                detailedPrompt: prompt,
                jobDescription,
                time,
                responseFromAi: {
                    title: a.title,
                    questions: questions,
                }
            });
            yield newData.save();
            res.status(200).json({
                success: true,
                data: questions,
                message: "Technical Questions Generated"
            });
            return;
        }
        catch (error) {
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
    });
}
