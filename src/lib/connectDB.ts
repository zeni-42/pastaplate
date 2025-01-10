import mongoose from "mongoose";
import { DBNAME } from "./constants";

type connectionObject = {
    isConnected? :number;
}

const connection : connectionObject = {};

async function DBconnect():Promise<void> {
    if (connection.isConnected) {
        console.log(`DB EXIST`);
        return;
    }

    try {
        const database = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`)
        connection.isConnected = database.connections[0].readyState;
        console.log(`DB CONNECTED`);
    } catch (error) {
        console.log(`DB FAILED`);
        process.exit(1)
    }
}

export default DBconnect