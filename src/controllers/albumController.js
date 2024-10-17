import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";
import songModel from "../models/songModel.js";

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
const singleAlbum = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await albumModel.findById(id);
    console.log(resp);
    const { _id } = resp;

    const songData = await songModel.find({
      albumId: _id,
    });

    res.json({ success: true, data: { album: resp, albumSongs: songData } });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addAlbum, removeAlbum, listAlbum, singleAlbum };
