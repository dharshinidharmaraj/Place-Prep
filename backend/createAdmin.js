const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    const admins = [
      {
        username: "placement",
        password: "Placement@123",
        role: "placement_coordinator",
      },
      {
        username: "tutor",
        password: "Tutor@123",
        role: "tutor",
      },
      {
        username: "hod",
        password: "Hod@123",
        role: "hod",
      },
      {
        username: "admin",
        password: "Admin@123",
        role: "admin",
      },
    ];

    for (const admin of admins) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);

      await Admin.create({
        username: admin.username,
        password: hashedPassword,
        role: admin.role,
      });
    }

    console.log("4 admins created successfully");

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });