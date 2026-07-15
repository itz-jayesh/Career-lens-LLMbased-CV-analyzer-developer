import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);

const User_Model: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User_Model;