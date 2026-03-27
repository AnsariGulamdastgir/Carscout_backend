const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
require("dotenv").config();

// ✅ CORS (ONLY ONCE)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Body parser
app.use(express.json());

// ✅ Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ DB Connection
const DBConnection = require("./src/utils/DBConnection");
DBConnection();

// ✅ Routes
const userRoutes = require("./src/routes/UserRoutes");
app.use("/user", userRoutes);

const carRoutes = require("./src/routes/CarRoutes");
app.use("/car", carRoutes);

const inquiryRoutes = require("./src/routes/InquiryRoutes");
app.use("/inquiry", inquiryRoutes);

const adminRoutes = require("./src/routes/AdminRoutes");
app.use("/admin", adminRoutes);

const messageRoutes = require("./src/routes/MessageRoutes");
app.use("/message", messageRoutes);

const reviewRoutes = require("./src/routes/ReviewRoutes");
app.use("/reviews", reviewRoutes);

const testDriveRoutes = require("./src/routes/TestDriveRoutes");
app.use("/testdrive", testDriveRoutes);

const notificationRoutes = require("./src/routes/NotificationRoutes");
app.use("/notification", notificationRoutes);

// ✅ Worker
const { startTestDriveReminderWorker } = require("./src/controller/TestDriveController");

// ✅ Server start
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    startTestDriveReminderWorker();
    console.log(`🚀 Server is running on port ${PORT}`);
});