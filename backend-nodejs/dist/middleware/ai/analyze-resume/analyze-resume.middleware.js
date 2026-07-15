"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Analyze_Resume_Middleware;
function Analyze_Resume_Middleware(req, res, next) {
    try {
        const { jobDescription, resumeData, time, section } = req.body;
        const errors = [];
        if (!section || typeof section !== 'string')
            errors.push("section is required and must be a string.");
        if (!jobDescription || typeof jobDescription !== 'string')
            errors.push("jobDescription is required and must be a string.");
        if (!resumeData || typeof resumeData !== 'string')
            errors.push("resumeData is required and must be a string.");
        if (!time || typeof time !== 'string')
            errors.push("time is required and must be a string.");
        if (errors.length > 0) {
            res.status(200).json({ success: false, message: errors.join(" ") });
            return;
        }
        next();
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
        return;
    }
}
