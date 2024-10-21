import { hashPassword } from "./helper";
import adminModel from "./models/adminModel";

module.exports = {
  createFirstAdmin: async (plainPassword, hashedPassword) => {
    const EMAIL = "admin@spotify.com";
    const PASSWORD = "1@2.comM";

    try {
      const adminExists = await adminModel.find();
      if (adminExists) {
        console.log("Admin already exists. Skipping creation.");
        return;
      }
      const hashedPassword = hashPassword(PASSWORD);
      const adminCreated = await adminModel.create({
        email: EMAIL,
        passsword: hashedPassword,
      });
      console.log("Admin created with this email :", adminCreated.email);
    } catch (error) {
      console.error("Error Creating admin user:", error);
    }
  },
};
