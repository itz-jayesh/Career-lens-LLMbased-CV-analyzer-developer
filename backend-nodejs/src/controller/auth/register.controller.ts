import User_Model from "../../models/User.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function Register_Controller(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User_Model.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: "User with the entered credentials already exists." });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User_Model.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ email: newUser.email }, "123", { expiresIn: "1d" });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            name: newUser.name,
            email: newUser.email,
        });
        return;
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }
}
