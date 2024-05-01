const { db } = require("../config/configdb");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const getUser = await new Promise((resolve, reject) => {
      db.get(
        "SELECT Id , username , email , phone , fullName , role FROM user WHERE email = ? AND password = ?",
        [email, password],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
    if (getUser) {
      const token = jwt.sign({ user: getUser.Id }, "7B221");
      const user = {
        ...getUser,
        token,
      };
      res.send({ success: true, message: "User found.", data: user });
    } else {
      res.send({ success: false, message: "Invalid email or password." });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred.",
      error: error.message,
    });
  }
};

const register = (req, res) => {
  const { username, password, email, fullname, phone } = req.body;
  db.run(`INSERT INTO user (username, password , email , fullname , phone) 
    VALUES ('${username}', '${password}' , '${email}' , '${fullname}' , '${phone}')`);
  res.send({
    success: true,
  });
};

const updateRole = (req, res) => {
  const { id, role } = req.body;
  db.run("UPDATE user SET role = ? WHERE Id = ?", [role, id], (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send({
        success: true,
        message: "Role updated successfully.",
        data: { id, role },
      });
    }
  });
};

module.exports = {
  login,
  register,
  updateRole,
};
