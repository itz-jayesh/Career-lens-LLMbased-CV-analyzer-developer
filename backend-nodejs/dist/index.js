"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const promises_1 = __importDefault(require("node:dns/promises"));
promises_1.default.setServers(["1.1.1.1", "8.8.8.8"]);
const ConnectDB_1 = __importDefault(require("./database/ConnectDB"));
(0, ConnectDB_1.default)();
const app = (0, express_1.default)();
const main_1 = __importDefault(require("./main"));
const constants_1 = require("./constants");
// Middlewares
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// All Routes
app.use(main_1.default);
// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not exist",
        path: req.url,
        timestamp: new Date().toISOString(),
    });
    return;
});
// Error Handler middleware
app.use((req, res) => {
    res.status(500).json({
        success: false,
        message: "An error occurred while processing your request",
        path: req.url,
        timestamp: new Date().toISOString(),
    });
    return;
});
app.listen(constants_1.PORT, () => {
    console.clear();
    console.log(`Server - http://localhost:${constants_1.PORT}`);
});
