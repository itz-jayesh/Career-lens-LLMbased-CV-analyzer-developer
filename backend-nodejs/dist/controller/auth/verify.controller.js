"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VerifyToken_Controller;
const User_model_1 = __importDefault(require("../../models/User.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function VerifyToken_Controller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.body.token;
            const decoded = jsonwebtoken_1.default.verify(token, "123");
            if (!(decoded === null || decoded === void 0 ? void 0 : decoded.email)) {
                res.status(400).json({ success: false, message: "Invalid token structure." });
                return;
            }
            const user = yield User_model_1.default.findOne({ email: decoded.email });
            if (!user) {
                res.status(404).json({ success: false, message: "User not found." });
                return;
            }
            const newToken = jsonwebtoken_1.default.sign({ email: user.email }, "123", { expiresIn: "1d" });
            res.status(200).json({
                success: true,
                message: "Token verified successfully.",
                token: newToken,
                name: user.name,
                email: user.email,
            });
            return;
        }
        catch (error) {
            if (error.name === "TokenExpiredError") {
                res.status(401).json({ success: false, message: "Token has expired. Please login again." });
                return;
            }
            if (error.name === "JsonWebTokenError") {
                res.status(401).json({ success: false, message: "Invalid token." });
                return;
            }
            res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
            return;
        }
    });
}
