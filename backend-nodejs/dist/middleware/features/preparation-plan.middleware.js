"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Preparation_Plan_Middleware;
function Preparation_Plan_Middleware(req, res, next) {
    try {
        const { time, jobDescription } = req.body;
        if (!time || typeof time !== "string")
            res.status(400).json({ success: false, message: "time is required and must be a string." });
        if (!jobDescription || typeof jobDescription !== "string")
            res.status(400).json({ success: false, message: "jobDescription is required and must be a string." });
        next();
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
        return;
    }
}
