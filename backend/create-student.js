const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Student = require("./models/Student");


require("dotenv").config();

// Enter the 65 students' roll numbers here
const rollNumbers = [
    "24BCS101",
  "24BCS102",
  "24BCS103",
  "24BCS104",
  "24BCS105",
  "24BCS106",
  "24BCS107",
  "24BCS108",
  "24BCS109",
  "24BCS110",
  "24BCS111",
  "24BCS112",
  "24BCS113",
  "24BCS114",
  "24BCS115",
  "24BCS116",
  "24BCS117",
  "24BCS118",
  "24BCS119",
  "24BCS120",
  "24BCS121",
  "24BCS122",
  "24BCS123",
  "24BCS124",
  "24BCS125",
  "24BCS126",
  "24BCS127",
  "24BCS128",
  "24BCS129",
  "24BCS130",
  "24BCS131",
  "24BCS132",
  "24BCS133",
  "24BCS134",
  "24BCS135",
  "24BCS136",
  "24BCS137",
  "24BCS138",
  "24BCS139",
  "24BCS140",
  "24BCS141",
  "24BCS142",
  "24BCS143",
  "24BCS144",
  "24BCS145",
  "24BCS146",
  "24BCS147",
  "24BCS148",
  "24BCS149",
  "24BCS150",
  "24BCS151",
  "24BCS152",
  "24BCS153",
  "24BCS154",
  "24BCS155",
  "24BCS156",
  "24BCS157",
  "24BCS158",
  "24BCS159",
  "24BCS160",
  "24BCS161",
  "24BCS162",
  "24BCS163",
  "24BCS164",
  "24BCS165",
  "24BCS166",
];

async function createStudents() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

    const students = [];

    for (let i = 0; i < rollNumbers.length; i++) {
      const rollNumber = rollNumbers[i];

      // Temporary password
      const plainPassword = `PlacePrep@${i + 1}`;

      // Hash password before storing it
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      students.push({
        name: `Student ${i + 1}`,
        rollNumber: rollNumber,

        // Initially use roll number as username
        username: rollNumber,

        password: hashedPassword,

        role: "student",
      });
    }

    // Insert all students into MongoDB
    await Student.insertMany(students);

    console.log(`${students.length} students created successfully!`);

    await mongoose.connection.close();

  } catch (error) {
    console.error("Error creating students:", error);
  }
}

createStudents();