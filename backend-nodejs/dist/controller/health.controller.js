"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Health_Controller;
const mongoose_1 = __importDefault(require("mongoose"));
function Health_Controller(req, res) {
    try {
        res.status(200).json({
            success: true,
            mongoDbStatus: mongoose_1.default.connection.readyState === 1 ? "connected" : "disconnected",
            timestamp: new Date().toISOString(),
            message: mongoose_1.default.connection.readyState === 1 ? "Server is working fine" : "Server is disconnected from mongodb"
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            mongoDbStatus: mongoose_1.default.connection.readyState === 1 ? "connected" : "disconnected",
            timestamp: new Date().toISOString(),
            message: "Some error while getting information about server."
        });
        return;
    }
}
