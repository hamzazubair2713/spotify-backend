import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";
const addSong = async (req, res) => {
  try {
    const { name, desc, albumId } = req.body;
    const audioFile = req.files?.audio[0];
    const imageFile = req.files.image[0];

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;
    // console.log(duration);
    // console.log(name, desc, album, audioUpload, imageUpload);
    const songData = {
      name,
      desc,
      albumId,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };
    const song = songModel(songData);
    await song.save();
    res.json({ success: true, message: "Song Added successfully" });
  } catch (error) {
    // console.log("in Error", error);
    res.json({ success: false, message: error.message });
  }
};

const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    res.json({ success: true, songs: allSongs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
const updateSong = async (req, res) => {
  const { id } = req.params;
  const { name, desc } = req.body;
  console.log({ id, name, desc });
  try {
    const allSongs = await songModel.findByIdAndUpdate(id, { name, desc });
    res.json({ success: true, message: "Song updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
const removeSong = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await songModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Song Removed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addSong, listSong, removeSong, updateSong };
