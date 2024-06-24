// Import required modules
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import rootRouter from "./routes/root.js";
import userRouter from "./routes/user.routes.js";
import notesRouter from "./routes/notes.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import { database_connection } from "./config/database_connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
database_connection();
// one way
app.use("/", express.static(path.join(__dirname, "public")));
// another way
// app.use(express.static("public"));

// Define a route handler for the default home page
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/notes", notesRouter);
app.all("*", (req, res, next) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    const error = new Error("404 Not found!");
    error.status = 404;
    next(error);
  } else {
    res.type("txt").send("404 not found");
  }
});
// Start the server on the specified port

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
