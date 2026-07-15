import { NextFunction, Request, Response } from "express";
import Resume_Model from "../../models/Resume.model";

export default async function Get_Resume_Data(req: Request, res: Response, next: NextFunction) {
    try {
        const { resumeId } = req.params;
        const resume = await Resume_Model.findOne({ resumeId });

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
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
        return;
    }
}