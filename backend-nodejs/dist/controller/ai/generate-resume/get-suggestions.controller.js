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
exports.default = AI_Get_Suggestions;
const GenerateResumeConversation_model_1 = __importDefault(require("../../../models/GenerateResumeConversation.model"));
const Get_Random_Gemini_Key_1 = __importDefault(require("../../../functions/Get_Random_Gemini_Key"));
const AI_Prompt_1 = __importDefault(require("../../../prompt/AI_Prompt"));
const genai_1 = require("@google/genai");
const Clean_Confidential_Credentials_1 = __importDefault(require("../../../functions/Clean_Confidential_Credentials"));
function AI_Get_Suggestions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const { template, section, data, userPrompt, sessionId, email } = req.body;
        const uPrompt = (0, Clean_Confidential_Credentials_1.default)(userPrompt);
        try {
            const detailedPrompt = AI_Prompt_1.default.Generate_Resume_Get_Suggestion(data, section, uPrompt);
            const { apiKey, model } = (0, Get_Random_Gemini_Key_1.default)();
            const ai = new genai_1.GoogleGenAI({ apiKey });
            const response = yield ai.models.generateContent({
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
            const newData = new GenerateResumeConversation_model_1.default({
                template,
                section,
                data,
                userPrompt,
                detailedPrompt,
                sessionId,
                email,
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
                message: "Suggestion from AI."
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
