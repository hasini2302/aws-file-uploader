# 🚀 Cloud File Uploader Web App

A full-stack file uploader web application that allows users to securely upload files directly to **AWS S3** using a **Node.js + Express backend** and a **Netlify-hosted frontend**. This project demonstrates cloud integration, deployment, and cross-origin request handling.

---

## 🌐 Live Demo

- **Frontend:** [Fluffy Swan Netlify](https://fluffy-swan-3a3e5d.netlify.app)  
- **Backend API:** [File Uploader Backend Render](https://file-uploader-backend-9cdl.onrender.com)

---

## 💡 Features

- Upload files directly to AWS S3
- Returns public URL for each uploaded file
- Elegant and responsive frontend UI
- Backend handles file uploads, AWS integration, and CORS
- Environment-based configuration for secure deployment

---

## ⚙️ Tech Stack

| Layer        | Technology                       |
|-------------|----------------------------------|
| Frontend    | HTML, CSS, JavaScript             |
| Backend     | Node.js, Express, Multer          |
| Cloud       | AWS S3 (file storage)             |
| Deployment  | Netlify (frontend), Render (backend) |
| Version Control | Git & GitHub                  |
| Environment Variables | dotenv                  |

---

## 📝 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/KanduriNikitha/aws-file-uploader.git
cd aws-file-uploader

# 🚀 File Uploader

A simple and clean web application to upload files to AWS S3 and get a public URL.  

---

## 2️⃣ Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Copy environment example
cp .env.example .env

⚡ How to Use

\------------

  

1.  Open the frontend URL in your browser.

2.  Click \*\*Choose File\*\* and select a file.

3.  Click \*\*Upload\*\*.

4.  After successful upload, the public URL of the file will be displayed.

5.  Click the link to view/download the file.

  

🛠 Notes

\--------

  

\*   Ensure your AWS IAM user has s3:PutObject and s3:PutObjectAcl permissions.

\*   For CORS to work correctly, add your frontend origin in ALLOWED\\\_ORIGINS.

\*   Bucket ACLs should be disabled; use bucket policy for public-read access.