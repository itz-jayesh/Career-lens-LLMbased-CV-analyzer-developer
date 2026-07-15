import mongoose, { Schema, Document, Model } from "mongoose";

type Question = {
    title: string;
    answer: string;
};

type Ai_Response = {
    title: string;
    questions: Question[];
};

export interface Technical_Questions_Interface extends Document {
    jobDescription: string;
    detailedPrompt: string;
    responseFromAi: Ai_Response;
    time: string;
}

const Technical_Questions_Schema = new Schema<Technical_Questions_Interface>(
    {
        jobDescription: {
            type: String,
            required: true,
            trim: true
        },
        responseFromAi: {
            title: {
                type: String,
                required: true,
                trim: true
            },
            questions: [
                {
                    title: {
                        type: String,
                        required: true,
                        trim: true
                    },
                    answer: {
                        type: String,
                        required: true,
                        trim: true
                    }
                }
            ]
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
        }
    },
    { timestamps: true }
);

const Technical_Questions_Model: Model<Technical_Questions_Interface> =
    mongoose.models.TechnicalQuestions ||
    mongoose.model<Technical_Questions_Interface>("TechnicalQuestions", Technical_Questions_Schema);

export default Technical_Questions_Model;