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
exports.default = Login_Google_Controller;
const User_model_1 = __importDefault(require("../../models/User.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function Login_Google_Controller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email } = req.body;
            let user = yield User_model_1.default.findOne({ email });
            if (!user) {
                const hashedPassword = yield bcryptjs_1.default.hash("password", 10);
                user = new User_model_1.default({
                    name: name.trim(),
                    email: email.toLowerCase(),
                    password: hashedPassword,
                });
                yield user.save();
                const token = jsonwebtoken_1.default.sign({ email: user.email }, "123", { expiresIn: "1d" });
                res.status(201).json({
                    success: true,
                    message: "Google user registered successfully.",
                    token,
                    name: name.trim(),
                    email: email.trim(),
                });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ email: user.email }, "123", { expiresIn: "1d" });
            res.status(200).json({
                success: true,
                message: "Google login successful.",
                token,
                name: name.trim(),
                email: email.trim(),
            });
            return;
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
            return;
        }
    });
}
