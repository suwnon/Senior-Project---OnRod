const { getUserById, getByRole, updateProfile } = require("../handle/user");

module.exports = (app) => {
  app.post("/user/:id", getUserById);
  app.get("/user/:role", getByRole);
  app.put("/user/:id", updateProfile);
};
