import { BACKEND } from "./Constants";

const API_Routes = {

    // auth
    login: BACKEND + "/api/v1/auth/login",
    loginGoogle: BACKEND + "/api/v1/auth/login/google",
    register: BACKEND + "/api/v1/auth/register",
    verify: BACKEND + "/api/v1/auth/verify",

    // resume
    addGeneratedResume: BACKEND + "/api/v1/resume/add",
    getGeneratedResume: (email: string) => BACKEND + `/api/v1/resume/get/${email}`,
    getResume: (resumeId: string) => BACKEND + `/api/v1/resume/resume/${resumeId}`,
    updateResume: (resumeId: string) => BACKEND + `/api/v1/resume/update/${resumeId}`,

    // AI
    generateResumeSuggestions: BACKEND + "/api/v1/ai/generate-resume",
    analyzeResume: BACKEND + "/api/v1/ai/analyze-resume",

    // New Features
    technicalQuestions: BACKEND + "/api/v1/ai/features/technical-questions",
    preparationPlan: BACKEND + "/api/v1/ai/features/preparation-plan",

}

export default API_Routes;