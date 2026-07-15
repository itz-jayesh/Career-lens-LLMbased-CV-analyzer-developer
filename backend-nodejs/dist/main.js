"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const add_generate_resume_conversation_middleware_1 = __importDefault(require("./middleware/ai/add-generate-resume-conversation.middleware"));
const technical_questions_controller_1 = __importDefault(require("./controller/ai/features/technical-questions.controller"));
const preparation_plan_controller_1 = __importDefault(require("./controller/ai/features/preparation-plan.controller"));
const technical_questions_middleware_1 = __importDefault(require("./middleware/features/technical-questions.middleware"));
const analyze_resume_middleware_1 = __importDefault(require("./middleware/ai/analyze-resume/analyze-resume.middleware"));
const preparation_plan_middleware_1 = __importDefault(require("./middleware/features/preparation-plan.middleware"));
const get_suggestions_controller_1 = __importDefault(require("./controller/ai/generate-resume/get-suggestions.controller"));
const analyze_resume_controller_1 = __importDefault(require("./controller/ai/analyze-resume/analyze-resume.controller"));
const update_resume_middleware_1 = __importDefault(require("./middleware/resume/update-resume.middleware"));
const loginGoogle_controller_1 = __importDefault(require("./controller/auth/loginGoogle.controller"));
const loginGoogle_middleware_1 = __importDefault(require("./middleware/auth/loginGoogle.middleware"));
const get_resume_middleware_1 = __importDefault(require("./middleware/resume/get-resume.middleware"));
const add_resume_middleware_1 = __importDefault(require("./middleware/resume/add-resume.middleware"));
const get_resume_data_controller_1 = __importDefault(require("./controller/resume/get-resume-data.controller"));
const get_my_resumes_controller_1 = __importDefault(require("./controller/resume/get-my-resumes.controller"));
const verify_controller_1 = __importDefault(require("./controller/auth/verify.controller"));
const update_resume_controller_1 = __importDefault(require("./controller/resume/update-resume.controller"));
const register_controller_1 = __importDefault(require("./controller/auth/register.controller"));
const register_middleware_1 = __importDefault(require("./middleware/auth/register.middleware"));
const verify_middleware_1 = __importDefault(require("./middleware/auth/verify.middleware"));
const add_resume_controller_1 = __importDefault(require("./controller/resume/add-resume.controller"));
const login_controller_1 = __importDefault(require("./controller/auth/login.controller"));
const login_middleware_1 = __importDefault(require("./middleware/auth/login.middleware"));
const health_controller_1 = __importDefault(require("./controller/health.controller"));
const express_1 = __importDefault(require("express"));
const Routes = express_1.default.Router();
// Auth
Routes.post('/api/v1/auth/login', login_middleware_1.default, login_controller_1.default);
Routes.post('/api/v1/auth/login/google', loginGoogle_middleware_1.default, loginGoogle_controller_1.default);
Routes.post('/api/v1/auth/register', register_middleware_1.default, register_controller_1.default);
Routes.post('/api/v1/auth/verify', verify_middleware_1.default, verify_controller_1.default);
// Resume
Routes.post('/api/v1/resume/add', add_resume_middleware_1.default, add_resume_controller_1.default);
Routes.get('/api/v1/resume/get/:email', get_resume_middleware_1.default, get_my_resumes_controller_1.default);
Routes.get('/api/v1/resume/resume/:resumeId', get_resume_data_controller_1.default);
Routes.patch('/api/v1/resume/update/:resumeId', update_resume_middleware_1.default, update_resume_controller_1.default);
// Analyze Resume
Routes.post('/api/v1/ai/analyze-resume', analyze_resume_middleware_1.default, analyze_resume_controller_1.default);
// AI Suggestions 
Routes.post('/api/v1/ai/generate-resume', add_generate_resume_conversation_middleware_1.default, get_suggestions_controller_1.default);
// Health
Routes.get('/health', health_controller_1.default);
// New Features - (Technical Questions & Preparation Plan)
Routes.post('/api/v1/ai/features/technical-questions', technical_questions_middleware_1.default, technical_questions_controller_1.default);
Routes.post('/api/v1/ai/features/preparation-plan', preparation_plan_middleware_1.default, preparation_plan_controller_1.default);
exports.default = Routes;
