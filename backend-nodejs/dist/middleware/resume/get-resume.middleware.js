"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Get_Resume_Middleware;
function Get_Resume_Middleware(req, res, next) {
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later" });
        return;
    }
}
