import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
const app = express();

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
