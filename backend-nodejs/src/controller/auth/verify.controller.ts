import User_Model from "../../models/User.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async function VerifyToken_Controller(req: Request, res: Response) {
    try {
        const token = req.body.token;
        const decoded = jwt.verify(token, "123") as { email: string };

        if (!decoded?.email) {
            res.status(400).json({ success: false, message: "Invalid token structure." });
            return;
        }

        const user = await User_Model.findOne({ email: decoded.email });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found." });
            return;
        }

        const newToken = jwt.sign({ email: user.email }, "123", { expiresIn: "1d" });

        res.status(200).json({
            success: true,
            message: "Token verified successfully.",
            token: newToken,
            name: user.name,
            email: user.email,
        });
        return;
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            res.status(401).json({ success: false, message: "Token has expired. Please login again." });
            return;
        }

        if (error.name === "JsonWebTokenError") {
            res.status(401).json({ success: false, message: "Invalid token." });
            return;
        }

        res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
        return;
    }
}