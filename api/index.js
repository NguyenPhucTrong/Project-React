import express from "express";
import mongoose from "mongoose";

const app = express();
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
