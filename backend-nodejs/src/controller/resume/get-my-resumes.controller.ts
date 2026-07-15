import Resume_Model from "../../models/Resume.model";
import { Request, Response } from "express";

export default async function Get_My_Resumes(req: Request, res: Response) {
    try {
        const { email } = req.params;

        const resume = await Resume_Model.find({ email }).sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            message: "Resume fetched successfully",
            data: resume
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later."
        });
    }
}