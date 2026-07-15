import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dns from 'node:dns/promises';

dns.setServers(["1.1.1.1", "8.8.8.8"]);

import ConnectDB from './database/ConnectDB';
ConnectDB();

const app: Application = express();

import Routes from './main';
import { PORT } from './constants';

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// All Routes
app.use(Routes);

// 404 Handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not exist",
        path: req.url,
        timestamp: new Date().toISOString(),
    })
    return;
});

// Error Handler middleware
app.use((req: Request, res: Response) => {
    res.status(500).json({
        success: false,
        message: "An error occurred while processing your request",
        path: req.url,
        timestamp: new Date().toISOString(),
    })
    return;
});


app.listen(PORT, () => {
    console.clear();
    console.log(`Server - http://localhost:${PORT}`);
});