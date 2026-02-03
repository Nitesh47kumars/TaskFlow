import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

//Routes
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";
import errorHandler from "./middleware.js/errorHandler.middleware.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);


app.use(errorHandler)

export default app;
