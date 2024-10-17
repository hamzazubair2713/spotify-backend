import express from "express";
import {
  addAlbum,
  listAlbum,
  removeAlbum,
  singleAlbum,
} from "../controllers/albumController.js";
import upload from "../middleware/multer.js";

const albumRouter = express.Router();

albumRouter.post("/add", upload.single("image"), addAlbum);

albumRouter.get("/list", listAlbum);
albumRouter.get("/:id", singleAlbum);
albumRouter.delete("/remove/:id", removeAlbum);

export default albumRouter;
