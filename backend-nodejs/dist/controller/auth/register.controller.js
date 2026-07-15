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
exports.default = Register_Controller;
const User_model_1 = __importDefault(require("../../models/User.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function Register_Controller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            const existingUser = yield User_model_1.default.findOne({ email });
            if (existingUser) {
                res.status(400).json({ success: false, message: "User with the entered credentials already exists." });
                return;
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newUser = yield User_model_1.default.create({ name, email, password: hashedPassword });
            const token = jsonwebtoken_1.default.sign({ email: newUser.email }, "123", { expiresIn: "1d" });
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                token,
                name: newUser.name,
                email: newUser.email,
            });
            return;
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
            return;
        }
    });
}
