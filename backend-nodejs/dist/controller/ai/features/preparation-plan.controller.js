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
exports.default = Generate_Preparation_Plan_Controller;
const Get_Random_Gemini_Key_1 = __importDefault(require("../../../functions/Get_Random_Gemini_Key"));
const AI_Prompt_1 = __importDefault(require("../../../prompt/AI_Prompt"));
const genai_1 = require("@google/genai");
const Preparation_Plan_model_1 = __importDefault(require("../../../models/new-features/Preparation_Plan.model"));
function Generate_Preparation_Plan_Controller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { time, jobDescription } = req.body;
        try {
            const prompt = AI_Prompt_1.default.Generate_Preparation_Plan(jobDescription);
            const { apiKey, model } = (0, Get_Random_Gemini_Key_1.default)();
            const ai = new genai_1.GoogleGenAI({ apiKey });
            const response = yield ai.models.generateContent({
                model,
                contents: prompt,
                config: { responseMimeType: "text/plain" }
            });
            const r = response.text;
            const newData = new Preparation_Plan_model_1.default({
                detailedPrompt: prompt,
                jobDescription,
                time,
                responseFromAi: r
            });
            yield newData.save();
            res.status(200).json({
                success: true,
                data: r,
                message: "Preparation Plan Generated"
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
