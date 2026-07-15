import mongoose, { Schema, Document, Model } from "mongoose";

export interface ResumeDetails_Doc extends Document {
    email: string;
    title: string;
    template: string;
    data: Object;
    resumeId: string;
}

const ResumeSchema = new Schema<ResumeDetails_Doc>(
    {
        resumeId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        title: {
            type: String
            , required: true,
            trim: true
        },
        template: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        data: {
            type: Object
        }
    },
    { timestamps: true }
);

const Resume_Model: Model<ResumeDetails_Doc> = mongoose.models.Resume || mongoose.model<ResumeDetails_Doc>("Resume", ResumeSchema);

export default Resume_Model;