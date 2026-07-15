import { GEMINI_API_KEYS, GEMINI_MODEL } from "../constants";

const Gemini_API_Keys: { apiKey: string, model: string }[] = [
    { apiKey: GEMINI_API_KEYS.test1, model: GEMINI_MODEL.test1 },
    { apiKey: GEMINI_API_KEYS.test2, model: GEMINI_MODEL.test2 },
    { apiKey: GEMINI_API_KEYS.test3, model: GEMINI_MODEL.test3 },
    { apiKey: GEMINI_API_KEYS.test4, model: GEMINI_MODEL.test4 },
    { apiKey: GEMINI_API_KEYS.test5, model: GEMINI_MODEL.test5 }
];

export default Gemini_API_Keys; 