import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js";
import learningContentRouter from "./routes/learningContent.routes.js";
import gamesRouter from "./routes/games.routes.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/games", gamesRouter);
app.use("/api/v1/learning", learningContentRouter);


const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log("Server started on port http://localhost:8080"));
    } catch (error) {
        console.log(error);
    }
};

startServer();