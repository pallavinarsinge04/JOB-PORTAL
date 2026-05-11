const express =
require("express");

const mongoose =
require("mongoose");

const cors =
require("cors");

require("dotenv").config();


// ==========================
// Route Imports
// ==========================

const authRoutes =
require("./routes/authRoutes");

const jobRoutes =
require("./routes/jobRoutes");

const applicationRoutes =
require("./routes/applicationRoutes");

const savedJobRoutes =
require("./routes/savedJobRoutes");

const notificationRoutes =
require("./routes/notificationRoutes");

const chatRoutes =
require("./routes/chatRoutes");


// ==========================
// App Config
// ==========================

const app =
express();

app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static("uploads")
);


// ==========================
// MongoDB Connection
// ==========================

mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "MongoDB Connected"
  );
})

.catch((err) => {

  console.log(err);
});


// ==========================
// API Routes
// ==========================

// Auth Routes
app.use(
  "/api/auth",
  authRoutes
);


// Job Routes
app.use(
  "/api/jobs",
  jobRoutes
);


// Application Routes
app.use(
  "/api/applications",
  applicationRoutes
);


// Saved Jobs Routes
app.use(
  "/api/saved-jobs",
  savedJobRoutes
);


// Notification Routes
app.use(
  "/api/notifications",
  notificationRoutes
);


// Chat Routes
app.use(
  "/api/chat",
  chatRoutes
);


// ==========================
// Home Route
// ==========================

app.get(
  "/",

  (req, res) => {

    res.send(
      "Job Portal API Running"
    );
  }
);


// ==========================
// Server Start
// ==========================

const PORT =
process.env.PORT || 5000;

app.listen(
  PORT,

  () => {

    console.log(
      `Server Running on Port ${PORT}`
    );
  }
);