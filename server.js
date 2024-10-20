import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoute.js";
import AdminRouter from "./src/routes/adminRoute.js";

// app config

const app = express();

const port = process.env.port || 4009;
connectDB();
connectCloudinary();
// middlewares

app.use(express.json());
app.use(cors());

// intializing routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.use("/api", AdminRouter);
app.get("/", (req, res) => res.send("Api is Working"));

app.listen(port, () => console.log(`server runing on port ${port}`));
