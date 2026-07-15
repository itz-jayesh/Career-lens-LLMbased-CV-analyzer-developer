import mongoose, { Schema, Document, Model } from "mongoose";

export interface GenerateResumeConversation_Interface extends Document {
    template: string;
    section: string;
    userPrompt: string;
    detailedPrompt: string;
    sessionId: string;
    email: string;
    response: {
        text: string;
        promptTokenCount: string;
        candidatesTokenCount: string;
        model: string;
        responseId: string;
    }
}

const GenerateResumeConversation_Schema = new Schema<GenerateResumeConversation_Interface>(
    {
        template: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        section: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        userPrompt: {
            type: String,
            required: true,
            trim: true
        },
        detailedPrompt: {
            type: String,
            required: true,
            trim: true
        },
        sessionId: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        response: {
            text: {
                type: String,
                trim: true
            },
            promptTokenCount: {
                type: Number
            },
            candidatesTokenCount: {
                type: Number
            },
            model: {
                type: String,
                trim: true
            },
            responseId: {
                type: String,
                trim: true
            }
        }
    },
    { timestamps: true }
);

const GenerateResumeConversation_Model: Model<GenerateResumeConversation_Interface> =
    mongoose.models.GenerateResumeConversation ||
    mongoose.model<GenerateResumeConversation_Interface>("GenerateResumeConversation", GenerateResumeConversation_Schema);

export default GenerateResumeConversation_Model;