"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Verify_Middleware;
function Verify_Middleware(req, res, next) {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ success: false, message: "Token missing. Authorization denied." });
            return;
        }
        req.token = token;
        next();
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later" });
        return;
    }
}
