const multer = require("multer");
const path = require("path");
const fs = require("fs");

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const createUploadMiddleware = ({
  destination,
  fields = [{ name: "file", maxCount: 1 }],
  maxFileSizeMb = 3,
  allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"],
  customFilename,
}) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const absPath = path.resolve(destination);
      ensureDir(absPath);
      cb(null, absPath);
    },
    filename: (req, file, cb) => {
      if (customFilename) return cb(null, customFilename(req, file));
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Unsupported file type"));
    }
    cb(null, true);
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: maxFileSizeMb * 1024 * 1024 },
  }).fields(fields);
};

module.exports = { createUploadMiddleware };