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
exports.default = Login_Controller;
const User_model_1 = __importDefault(require("../../models/User.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function Login_Controller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield User_model_1.default.findOne({ email });
            if (!user) {
                res.status(404).json({ success: false, message: "User not found. Please register first." });
                return;
            }
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({ success: false, message: "Invalid password." });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ email: user.email }, "123", { expiresIn: "1d" });
            res.status(200).json({
                success: true,
                message: "Login successful.",
                name: user.name,
                email: user.email,
                token,
            });
            return;
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
            return;
        }
    });
}
