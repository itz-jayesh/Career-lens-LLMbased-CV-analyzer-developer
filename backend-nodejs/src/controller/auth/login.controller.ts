import User_Model from "../../models/User.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function Login_Controller(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const user = await User_Model.findOne({ email });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found. Please register first." });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: "Invalid password." });
            return;
        }
        const token = jwt.sign({ email: user.email }, "123", { expiresIn: "1d" });

        res.status(200).json({
            success: true,
            message: "Login successful.",
            name: user.name,
            email: user.email,
            token,
        });
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
        return;
    }
}
