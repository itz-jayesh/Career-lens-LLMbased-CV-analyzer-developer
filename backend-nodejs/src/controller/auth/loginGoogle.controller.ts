import User_Model from "../../models/User.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function Login_Google_Controller(req: Request, res: Response) {
    try {
        const { name, email } = req.body;
        let user = await User_Model.findOne({ email });

        if (!user) {
            const hashedPassword = await bcrypt.hash("password", 10);

            user = new User_Model({
                name: name.trim(),
                email: email.toLowerCase(),
                password: hashedPassword,
            });

            await user.save();
            const token = jwt.sign({ email: user.email }, "123", { expiresIn: "1d" });

            res.status(201).json({
                success: true,
                message: "Google user registered successfully.",
                token,
                name: name.trim(),
                email: email.trim(),
            });
            return;
        }

        const token = jwt.sign({ email: user.email }, "123", { expiresIn: "1d" });

        res.status(200).json({
            success: true,
            message: "Google login successful.",
            token,
            name: name.trim(),
            email: email.trim(),
        });
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
        return;
    }
}