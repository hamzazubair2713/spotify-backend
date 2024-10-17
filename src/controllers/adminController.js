import bcryptjs from "bcryptjs";

import adminModel from "../models/adminModel.js";
const comparePassword = (plainPassword, hashedPassword) =>
  bcryptjs.compareSync(plainPassword, hashedPassword);
const hashPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  const passwordHashed = bcryptjs.hashSync(password, salt);
  return passwordHashed;
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let admin = await adminModel.findOne({ email });
  console.log(admin);
  console.log(comparePassword(password, admin.password));
  if (!admin || !comparePassword(password, admin.password)) {
    throw new Error("Email or Password is incorrect");
  }
  res.status(200).send({
    code: 200,
    success: true,
    message: "Login successful",
  });
};

const singup = async (req, res) => {
  try {
    const { email, password } = req.body;
    let admin = await adminModel.findOne({ email });
    console.log(admin);
    if (admin) {
      throw new Error("Admin already exists with this email ");
    }
    const hasedPassword = hashPassword(password);
    console.log(hasedPassword);
    const newAdmin = adminModel({ email, password: hasedPassword });
    await newAdmin.save();
    res.status(200).send({
      code: 200,
      success: true,
      message: "Admin Created successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { login, singup };
