const multer = require("multer");

const multerErrorHandler = (err, req, res, next) => {
  if (!err) return next();

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      code: err.code,
      message: err.message,
    });
  }

  return res.status(400).json({
    code: "UPLOAD_ERROR",
    message: err.message || "Upload failed",
  });
};

module.exports = multerErrorHandler;