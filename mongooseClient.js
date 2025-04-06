"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseClient = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MongooseClient = {
    async connect() {
        const uri = process.env.MONGODB_URL || '';
        const username = process.env.MONGODB_USERNAME || '';
        const password = process.env.MONGODB_PASSWORD || '';
        const connectionString = uri.replace('<username>', username).replace('<password>', password);
        try {
            await mongoose_1.default.connect(connectionString);
            console.log(' Connected to MongoDB with Mongoose');
        }
        catch (error) {
            console.error(' Mongoose connection error:', error);
            process.exit(1);
        }
    },
};
