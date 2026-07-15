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
exports.default = Analyze_Resume;
const Clean_Confidential_Credentials_1 = __importDefault(require("../../../functions/Clean_Confidential_Credentials"));
const Get_Random_Gemini_Key_1 = __importDefault(require("../../../functions/Get_Random_Gemini_Key"));
const Analyze_Resume_model_1 = __importDefault(require("../../../models/Analyze_Resume.model"));
const AI_Prompt_1 = __importDefault(require("../../../prompt/AI_Prompt"));
const genai_1 = require("@google/genai");
function Analyze_Resume(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const { jobDescription, resumeData, time, email, section } = req.body;
        const jd = (0, Clean_Confidential_Credentials_1.default)(jobDescription);
        const rd = (0, Clean_Confidential_Credentials_1.default)(resumeData);
        try {
            let detailedPrompt = "";
            if (section === "missing-skills")
                detailedPrompt = AI_Prompt_1.default.Analyze_Resume_Missing_Skills(jd, rd);
            else if (section === "ats-match")
                detailedPrompt = AI_Prompt_1.default.Analyze_Resume_ATS_Match(jd, rd);
            else if (section === "improve-my-resume")
                detailedPrompt = AI_Prompt_1.default.Analyze_Resume_Improve_My_Resume(jd, rd);
            else {
                res.status(200).json({ success: false, message: "invalid section value choosed." });
                return;
            }
            const { apiKey, model } = (0, Get_Random_Gemini_Key_1.default)();
            const ai = new genai_1.GoogleGenAI({ apiKey });
            const response = yield ai.models.generateContent({
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
            const newData = new Analyze_Resume_model_1.default({
                jobDescription,
                resumeData,
                email: email ? email : "none",
                time,
                detailedPrompt,
                section,
                response: {
                    text: textMessage,
                    promptTokenCount: ((_a = response.usageMetadata) === null || _a === void 0 ? void 0 : _a.promptTokenCount) || 0,
                    candidatesTokenCount: ((_b = response.usageMetadata) === null || _b === void 0 ? void 0 : _b.candidatesTokenCount) || 0,
                    model: response.modelVersion,
                    responseId: response.responseId
                }
            });
            yield newData.save();
            res.status(200).json({
                success: true,
                text: textMessage,
                message: "Response from AI."
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
