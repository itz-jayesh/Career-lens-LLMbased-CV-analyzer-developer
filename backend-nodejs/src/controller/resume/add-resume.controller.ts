import Generate_ID from "../../functions/Generate_ID";
import Resume_Model from "../../models/Resume.model";
import { Request, Response } from "express";

export default async function Add_Resume(req: Request, res: Response) {
    try {
        if (req.body.template === "template1") {
            const newResume = new Resume_Model({
                email: req.body.email,
                title: req.body.title,
                template: req.body.template,
                resumeId: Generate_ID(),
                data: {
                    personalDetails: req.body.personalDetails,
                    educationDetails: req.body.educationDetails,
                    skillDetails: req.body.skillDetails,
                    projectDetails: req.body.projectDetails,
                    certificationDetails: req.body.certificationDetails,
                    extraCurricularDetails: req.body.extraCurricularDetails,
                    experienceDetails: req.body.experienceDetails,
                }
            });
            await newResume.save();
            res.status(201).json({ success: true, message: "Resume added successfully" });
            return;
        }
        else {
            const newResume = new Resume_Model({
                email: req.body.email,
                title: req.body.title,
                template: req.body.template,
                resumeId: Generate_ID(),
                data: {
                    personalDetails: req.body.personalDetails,
                    educationDetails: req.body.educationDetails,
                    skillsDetails: req.body.skillsDetails,
                    projectDetails: req.body.projectDetails,
                    experienceDetails: req.body.experienceDetails,
                }
            });
            await newResume.save();
            res.status(201).json({ success: true, message: "Resume added successfully" });
            return;
        }
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
}