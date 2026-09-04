const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

const Student = require("./models/Student");
const Document = require("./models/Document");
const Admin = require("./models/Admin");
const Question = require("./models/Question");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// ===============================
// MULTER CONFIGURATION
// ===============================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
});

// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.send("Student Login Backend is Running!");
});

// ===============================
// STUDENT LOGIN API
// ===============================

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const student = await Student.findOne({ username });

    console.log("Username received:", username);

    console.log(
      "Student found:",
      student ? student.username : "NOT FOUND"
    );

    if (!student) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      student.password
    );

    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    console.log("Login successful!");

    return res.status(200).json({
      message: "Login successful",

      student: {
        name: student.name,
        rollNumber: student.rollNumber,
        username: student.username,
        role: student.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// ===============================
// STUDENT DOCUMENT UPLOAD API
// ===============================

app.post(
  "/api/documents/upload",
  upload.single("document"),
  async (req, res) => {
    try {
      const { username, documentType } = req.body;

      if (!username || !documentType) {
        return res.status(400).json({
          message: "Username and document type are required",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "Please select a file",
        });
      }

      // Find student
      const student = await Student.findOne({
        username: username,
      });

      if (!student) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      // Save document information in MongoDB
      const document = new Document({
        studentId: student._id,
        rollNumber: student.rollNumber,
        documentType: documentType,
        fileName: req.file.originalname,
        filePath: req.file.path,
      });

      await document.save();

      console.log(
        "Document uploaded by:",
        student.username
      );

      return res.status(201).json({
        message: "Document uploaded successfully",

        document: {
          id: document._id,
          rollNumber: document.rollNumber,
          documentType: document.documentType,
          fileName: document.fileName,
        },
      });

    } catch (error) {
      console.error("Document upload error:", error);

      return res.status(500).json({
        message: "Failed to upload document",
      });
    }
  }
);

// ===============================
// ADMIN - GET ALL DOCUMENTS API
// ===============================

app.get("/api/admin/documents", async (req, res) => {
  try {
    const documents = await Document.find()
      .populate(
        "studentId",
        "name rollNumber username"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(documents);

  } catch (error) {
    console.error(
      "Error fetching documents:",
      error
    );

    return res.status(500).json({
      message: "Failed to fetch documents",
    });
  }
});
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );
//Admin Login API
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    res.json({
      message: "Admin login successful",
      username: admin.username,
      role: admin.role,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ===============================
// ADMIN - POST MULTIPLE QUESTIONS
// ===============================

app.post("/api/admin/questions", async (req, res) => {
  try {
    const { questions, createdBy } = req.body;

    // Check whether questions were provided
    if (!questions || !Array.isArray(questions)) {
      return res.status(400).json({
        message: "Questions must be provided as an array",
      });
    }

    if (questions.length === 0) {
      return res.status(400).json({
        message: "Please add at least one question",
      });
    }

    // Validate every question
    for (const question of questions) {
      if (
        !question.question ||
        !question.category ||
        !question.answer
      ) {
        return res.status(400).json({
          message:
            "Every question must have question, category and answer",
        });
      }

      if (
        question.category !== "aptitude" &&
        question.category !== "dsa"
      ) {
        return res.status(400).json({
          message:
            "Category must be aptitude or dsa",
        });
      }
    }

    // Add createdBy to every question
    const questionsToSave = questions.map((question) => ({
      question: question.question,
      category: question.category,
      options: question.options || [],
      answer: question.answer,
      explanation: question.explanation || "",
      createdBy: createdBy || "admin",
    }));

    // Save all questions together
    const savedQuestions = await Question.insertMany(
      questionsToSave
    );

    return res.status(201).json({
      message: `${savedQuestions.length} questions posted successfully`,
      questions: savedQuestions,
    });

  } catch (error) {
    console.error(
      "Error posting questions:",
      error
    );

    return res.status(500).json({
      message: "Failed to post questions",
    });
  }
});


// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});