import Resume_Model from "../../models/Resume.model";
import { Request, Response } from "express";

export default async function Update_Resume(req: Request, res: Response) {
    try {
        const { resumeId } = req.params;

        if (req.body.template === "template1") {
            const update = await Resume_Model.updateOne({ resumeId }, {
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
            const update = await Resume_Model.updateOne({ resumeId }, {
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
    } catch (err: any) {
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
    }
}