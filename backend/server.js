const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

// setup multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// setup AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.REGION
});

const s3 = new AWS.S3();

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).send("Upload failed");
    }
    res.json({ url: data.Location });
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
});
