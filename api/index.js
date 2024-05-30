import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route";

const app = express();

app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/auth", authRouter);
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    sucess: false,
    statusCode,
    message,
  });
});
