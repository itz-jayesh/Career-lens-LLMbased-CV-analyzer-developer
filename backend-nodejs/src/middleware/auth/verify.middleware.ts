import { Request, Response, NextFunction } from "express";

export default function Verify_Middleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json({ success: false, message: "Token missing. Authorization denied." });
            return;
        }
        (req as any).token = token;

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later" });
        return;
    }
}