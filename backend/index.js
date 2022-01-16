import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todos from "./routes/todo.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/todos", todos);

app.get("/", (req, res) => res.send("welcome to the todos api..."));

const { MONGO_URI, PORT } = process.env;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`));

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established"))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
