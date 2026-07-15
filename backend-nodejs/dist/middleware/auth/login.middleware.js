"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login_Middleware;
function Login_Middleware(req, res, next) {
    const { email, password } = req.body;
    if (!email || typeof email !== "string" || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.status(400).json({ success: false, message: "A valid email address is required." });
        return;
    }
    if (!password || typeof password !== "string" || password.length < 6) {
        res.status(400).json({ success: false, message: "Password must be at least 6 characters long." });
        return;
    }
    next();
}
