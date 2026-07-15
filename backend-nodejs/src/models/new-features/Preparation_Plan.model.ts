import mongoose, { Schema, Document, Model } from "mongoose";

export interface Preparation_Plan_Interface extends Document {
    jobDescription: string;
    detailedPrompt: string;
    responseFromAi: string;
    time: string;
}

const Preparation_Plan_Schema = new Schema<Preparation_Plan_Interface>(
    {
        jobDescription: {
            type: String,
            required: true,
            trim: true
        },
        responseFromAi: {
            type: String,
            required: true,
            trim: true
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

const Preparation_Plan_Model: Model<Preparation_Plan_Interface> =
    mongoose.models.PreparationPlan ||
    mongoose.model<Preparation_Plan_Interface>("PreparationPlan", Preparation_Plan_Schema);

export default Preparation_Plan_Model;