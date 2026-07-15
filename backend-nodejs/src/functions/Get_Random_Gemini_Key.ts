import Gemini_API_Keys from "./Gemini_API_Keys";

export default function Get_Random_Gemini_Key() {
    const index = Math.floor(Math.random() * Gemini_API_Keys.length);

    return Gemini_API_Keys[index];
};