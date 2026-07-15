import Add_Generate_Resume_Conversation_Middleware from "./middleware/ai/add-generate-resume-conversation.middleware";
import Generate_Technical_Questions_Controller from "./controller/ai/features/technical-questions.controller";
import Generate_Preparation_Plan_Controller from "./controller/ai/features/preparation-plan.controller";
import Technical_Questions_Middleware from "./middleware/features/technical-questions.middleware";
import Analyze_Resume_Middleware from "./middleware/ai/analyze-resume/analyze-resume.middleware";
import Preparation_Plan_Middleware from "./middleware/features/preparation-plan.middleware";
import AI_Get_Suggestions from "./controller/ai/generate-resume/get-suggestions.controller";
import Analyze_Resume from "./controller/ai/analyze-resume/analyze-resume.controller";
import Update_Resume_Middleware from "./middleware/resume/update-resume.middleware";
import Login_Google_Controller from "./controller/auth/loginGoogle.controller";
import Login_Google_Middleware from "./middleware/auth/loginGoogle.middleware";
import Get_Resume_Middleware from "./middleware/resume/get-resume.middleware";
import Add_Resume_Middleware from "./middleware/resume/add-resume.middleware";
import Get_Resume_Data from "./controller/resume/get-resume-data.controller";
import Get_My_Resumes from "./controller/resume/get-my-resumes.controller";
import VerifyToken_Controller from "./controller/auth/verify.controller";
import Update_Resume from "./controller/resume/update-resume.controller";
import Register_Controller from "./controller/auth/register.controller";
import Regiser_Middleware from "./middleware/auth/register.middleware";
import Verify_Middleware from "./middleware/auth/verify.middleware";
import Add_Resume from "./controller/resume/add-resume.controller";
import Login_Controller from "./controller/auth/login.controller";
import Login_Middleware from "./middleware/auth/login.middleware";
import Health_Controller from "./controller/health.controller";
import express from "express";

const Routes = express.Router();

// Auth
Routes.post('/api/v1/auth/login', Login_Middleware, Login_Controller);
Routes.post('/api/v1/auth/login/google', Login_Google_Middleware, Login_Google_Controller);
Routes.post('/api/v1/auth/register', Regiser_Middleware, Register_Controller);
Routes.post('/api/v1/auth/verify', Verify_Middleware, VerifyToken_Controller);

// Resume
Routes.post('/api/v1/resume/add', Add_Resume_Middleware, Add_Resume);
Routes.get('/api/v1/resume/get/:email', Get_Resume_Middleware, Get_My_Resumes);
Routes.get('/api/v1/resume/resume/:resumeId', Get_Resume_Data);
Routes.patch('/api/v1/resume/update/:resumeId', Update_Resume_Middleware, Update_Resume);

// Analyze Resume
Routes.post('/api/v1/ai/analyze-resume', Analyze_Resume_Middleware, Analyze_Resume);

// AI Suggestions 
Routes.post('/api/v1/ai/generate-resume', Add_Generate_Resume_Conversation_Middleware, AI_Get_Suggestions);

// Health
Routes.get('/health', Health_Controller);

// New Features - (Technical Questions & Preparation Plan)
Routes.post('/api/v1/ai/features/technical-questions', Technical_Questions_Middleware, Generate_Technical_Questions_Controller);
Routes.post('/api/v1/ai/features/preparation-plan', Preparation_Plan_Middleware, Generate_Preparation_Plan_Controller);

export default Routes;