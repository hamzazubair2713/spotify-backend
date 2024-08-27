import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (req, res) => {
  try {
    const { name, desc, bgColor } = req.body;
    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    };
    const album = albumModel(albumData);
    await album.save();
    res.json({ success: true, message: "Ablum Created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
const listAlbum = async (req, res) => {
  try {
    const albums = await albumModel.find({});
    res.json({ success: true, albums });
  } catch (error) {}
};
const removeAlbum = async (req, res) => {
  const { id } = req.params;
  try {
    await albumModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Album removed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addAlbum, removeAlbum, listAlbum };
