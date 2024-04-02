const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5502;

// Configure CORS middleware
app.use(cors());

// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://prakhar1pant:CUbAo22a2QD16D7n@cluster0.hfta1bt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas", err));

app.use(express.json());

// Define attendance schema and model
const attendanceSchema = new mongoose.Schema({
  date: Date,
  student: String,
  attendanceStatus: String,
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

// Route handler for root URL
app.get("/", (req, res) => {
  res.send("Server is running.");
});

// Create a route to handle attendance submission
app.post("/attendance", async (req, res) => {
  console.log("Request method:", req.method);
  try {
    const { date, student, attendanceStatus } = req.body;
    const attendance = new Attendance({
      date,
      student,
      attendanceStatus,
    });
    await attendance.save();
    res.status(201).send("Attendance submitted successfully");
  } catch (err) {
    console.error("Error submitting attendance", err);
    res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
