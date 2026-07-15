import dotenv from 'dotenv';
dotenv.config();

import { APP_MONGODB_URL } from '../constants';
import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(APP_MONGODB_URL);

        if (conn) console.log("Connected");
        else throw new Error();
    } catch (error) {
        console.log(error);
        console.log("Error in connecting to DB");
    }
}

export default ConnectDB;