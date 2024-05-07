const { uploadFile } = require("../handle/upload");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const cpUpload = multer({ storage: storage }).array("image_car", 99999);

module.exports = (app) => {
  app.post("/uploadfile", cpUpload, uploadFile);
  app.get("/getimage");
};
