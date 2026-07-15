import { Request, Response } from "express";
import mongoose from "mongoose";

export default function Health_Controller(req: Request, res: Response) {
    try {
        res.status(200).json({
            success: true,
            mongoDbStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
            timestamp: new Date().toISOString(),
            message: mongoose.connection.readyState === 1 ? "Server is working fine" : "Server is disconnected from mongodb"
        })
        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            mongoDbStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
            timestamp: new Date().toISOString(),
            message: "Some error while getting information about server."
        })
        return;
    }
}