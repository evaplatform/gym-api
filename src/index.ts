// src/app.ts
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());
app.use(userRoutes);

const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/repository-pattern")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));
