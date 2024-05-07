const { db } = require("../config/configdb");
const uploadFile = async (req, res) => {
  try {
    if (req.files) {
      const { files } = req;
      const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const result = { filename: file.originalname, path: file.path };
          resolve(result);
        });
      });

      const uploadResults = await Promise.all(uploadPromises);
      res.status(200).json({
        success: true,
        message: "Files uploaded successfully",
        data: uploadResults,
      });
    } else {
      res.status(400).send("No files were uploaded.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports = {
  uploadFile,
};
