// backend/server.js
const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Parse allowed origins from env (comma-separated). If not set, allow all (dev)
const rawOrigins = process.env.ALLOWED_ORIGINS || "";
const allowedOrigins = rawOrigins
  ? rawOrigins.split(",").map(o => o.trim())
  : ["*"];

// Configure CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl or same-origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS policy: Origin not allowed"), false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));

// simple health route
app.get("/", (req, res) => {
  res.send("File uploader backend is running");
});

// Setup multer (store files in memory briefly)
const upload = multer({ storage: multer.memoryStorage() });

// Configure AWS SDK using env variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.REGION || "ap-south-1"
});

const s3 = new AWS.S3();
const BUCKET = process.env.S3_BUCKET;

// Upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const key = `${Date.now()}-${req.file.originalname}`; // unique name
    const params = {
      Bucket: BUCKET,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: "public-read" // make object public
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("S3 upload error:", err);
        return res.status(500).json({ error: "Failed to upload to S3", details: err.message });
      }

      // data.Location is the public URL
      return res.json({ url: data.Location });
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

// Error handler for CORS or other errors
app.use((err, req, res, next) => {
  if (err && err.message && err.message.includes("CORS")) {
    return res.status(403).json({ error: "CORS error: Access denied from this origin" });
  }
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Unexpected error", details: err.message || err });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
