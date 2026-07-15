"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Get_Random_Gemini_Key;
const Gemini_API_Keys_1 = __importDefault(require("./Gemini_API_Keys"));
function Get_Random_Gemini_Key() {
    const index = Math.floor(Math.random() * Gemini_API_Keys_1.default.length);
    return Gemini_API_Keys_1.default[index];
}
;
