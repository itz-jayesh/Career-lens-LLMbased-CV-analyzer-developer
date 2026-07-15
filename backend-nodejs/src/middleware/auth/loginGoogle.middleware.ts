import { Request, Response, NextFunction } from "express";

export default function Login_Google_Middleware(req: Request, res: Response, next: NextFunction) {
    const { name, email } = req.body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
        res.status(400).json({ success: false, message: "Name must be a valid string with at least 2 characters." });
        return;
    }

    if (!email || typeof email !== "string" || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.status(400).json({ success: false, message: "A valid email address is required." });
        return;
    }

    next();
}