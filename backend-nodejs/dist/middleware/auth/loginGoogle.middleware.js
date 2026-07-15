"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login_Google_Middleware;
function Login_Google_Middleware(req, res, next) {
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
