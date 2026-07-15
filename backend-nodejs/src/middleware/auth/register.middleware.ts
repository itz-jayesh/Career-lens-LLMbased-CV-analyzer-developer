import { Request, Response, NextFunction } from "express";

export default function Regiser_Middleware(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ success: false, message: "All fields are required" });
        return;
    }

    if (typeof name !== "string" || name.trim().length < 3) {
        res.status(400).json({ success: false, message: "Name must be at least 3 characters long" });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ success: false, message: "Invalid email format" });
        return;
    }

    if (typeof password !== "string" || password.length < 6) {
        res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        return;
    }

    next();
}