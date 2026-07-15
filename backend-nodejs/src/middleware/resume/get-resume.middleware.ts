import { Request, Response, NextFunction } from "express";

export default function Get_Resume_Middleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.params;

        if (!email) {
            res.status(404).json({ success: false, message: "Email parameter is required" });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            res.status(400).json({ success: false, message: "Invalid email format" });
            return;
        }

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later" });
        return;
    }
}