"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// not being used, currently using prisma with sql
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
// Connect configs
mongoose_1.default.connect(config_1.default.DB.URI);
// CONNECTION EVENTS
const connection = mongoose_1.default.connection;
// When successfully connected
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});
// handle mongo error
connection.on("error", (err) => {
    console.log("MongoDB database connection error:", err);
    process.exit(0);
});
