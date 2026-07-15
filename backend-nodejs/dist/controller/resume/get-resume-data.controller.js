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
exports.default = Get_Resume_Data;
const Resume_model_1 = __importDefault(require("../../models/Resume.model"));
function Get_Resume_Data(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { resumeId } = req.params;
            const resume = yield Resume_model_1.default.findOne({ resumeId });
            if (resume) {
                res.status(200).json({
                    success: true,
                    message: "Resume feched successfully",
                    data: resume
                });
            }
            else {
                res.status(404).json({ success: false, message: "Resume not found." });
            }
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
            return;
        }
    });
}
