import mongoose, { Schema, Document, Model } from "mongoose";

export interface Analyze_Resume_Interface extends Document {
    jobDescription: string;
    resumeData: string;
    email: string;
    time: string;
    detailedPrompt: string;
    section: string;
    response: {
        text: string;
        promptTokenCount: string;
        candidatesTokenCount: string;
        model: string;
        responseId: string;
    }
}

const Analyze_Resume_Schema = new Schema<Analyze_Resume_Interface>(
    {
        resumeData: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        jobDescription: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        time: {
            type: String,
            required: true,
            trim: true
        },
        detailedPrompt: {
            type: String,
            required: true,
            trim: true
        },
        section: {
            type: String,
            required: true,
            trim: true
        },
        response: {
            text: { type: String, trim: true },
            promptTokenCount: { type: Number },
            candidatesTokenCount: { type: Number },
            model: { type: String, trim: true },
            responseId: { type: String, trim: true }
        }
    },
    { timestamps: true }
);

const Analyze_Resume_Model: Model<Analyze_Resume_Interface> =
    mongoose.models.AnalyzeResume ||
    mongoose.model<Analyze_Resume_Interface>("AnalyzeResume", Analyze_Resume_Schema);

export default Analyze_Resume_Model;