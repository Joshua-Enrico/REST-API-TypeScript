import mongoose, { ConnectOptions } from "mongoose";
import config from "./config/config";

// Connect configs
mongoose.connect(config.DB.URI);

// CONNECTION EVENTS
const connection = mongoose.connection;

// When successfully connected
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
})

// handle mongo error
connection.on("error", (err) => {
    console.log("MongoDB database connection error:", err);
    process.exit(0);
})
