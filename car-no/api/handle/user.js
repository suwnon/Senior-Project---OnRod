const { db } = require("../config/configdb");
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM user WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    res.json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM user WHERE role = ?", [role], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      })
    })
    if (users) {
      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: users
      })
    } else {
      res.status(404).json({
        success: false,
        message: "Users not found"
      })
    }
  } catch (e) {
    res.status(500).send(e.message)
  }
}

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { link, photo_certificate } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const user = await new Promise((resolve, reject) => {
      db.run("UPDATE user SET photo_certificate = ?, link = ? WHERE id = ?", [photo_certificate, link, id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
}

module.exports = {
  getUserById,
  getByRole,
  updateProfile
};
