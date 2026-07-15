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
exports.default = Update_Resume;
const Resume_model_1 = __importDefault(require("../../models/Resume.model"));
function Update_Resume(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { resumeId } = req.params;
            if (req.body.template === "template1") {
                const update = yield Resume_model_1.default.updateOne({ resumeId }, {
                    $set: {
                        title: req.body.title,
                        data: {
                            personalDetails: req.body.personalDetails,
                            educationDetails: req.body.educationDetails,
                            skillDetails: req.body.skillDetails,
                            projectDetails: req.body.projectDetails,
                            certificationDetails: req.body.certificationDetails,
                            extraCurricularDetails: req.body.extraCurricularDetails,
                            experienceDetails: req.body.experienceDetails
                        }
                    }
                });
                if (update.modifiedCount)
                    res.status(200).json({ success: true, message: "Resume data updated successfully." });
                else
                    res.status(200).json({ success: false, message: "No data updated." });
            }
            else {
                const update = yield Resume_model_1.default.updateOne({ resumeId }, {
                    $set: {
                        title: req.body.title,
                        data: {
                            personalDetails: req.body.personalDetails,
                            educationDetails: req.body.educationDetails,
                            skillsDetails: req.body.skillsDetails,
                            projectDetails: req.body.projectDetails,
                            experienceDetails: req.body.experienceDetails
                        }
                    }
                });
                if (update.modifiedCount)
                    res.status(200).json({ success: true, message: "Resume data updated successfully." });
                else
                    res.status(200).json({ success: false, message: "No data updated." });
            }
        }
        catch (err) {
            res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
        }
    });
}
