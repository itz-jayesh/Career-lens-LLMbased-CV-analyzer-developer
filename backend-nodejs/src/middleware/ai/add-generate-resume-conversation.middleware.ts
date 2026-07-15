import { NextFunction, Request, Response } from "express";

export default function Add_Generate_Resume_Conversation_Middleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { template, section, data, userPrompt, sessionId, email } = req.body;
        let errors = [];

        if (!template || typeof template !== "string" || !(["template1", "template2"].includes(template)))
            errors.push("template is required and must be a string.");

        if (!section || typeof section !== "string")
            errors.push("section is required and must be a string.");

        if (!data || typeof data !== "string")
            errors.push("data is required and must be a string.");

        if (!userPrompt || typeof userPrompt !== "string")
            errors.push("userPrompt is required and must be a string.");

        if (!sessionId || typeof sessionId !== "string")
            errors.push("sessionId is required and must be a string.");

        if (!email || typeof email !== "string")
            errors.push("email is required and must be a string.");

        if (errors.length > 0) {
            res.status(200).json({ success: false, message: errors.join(" ") });
            return;
        }

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
        return;
    }
}