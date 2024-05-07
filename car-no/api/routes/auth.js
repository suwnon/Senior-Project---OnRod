const { login , register , updateRole} = require("../handle/auth");

module.exports = (app) => {
  app.post("/register",register);
  app.post("/login", login);
  app.put("/updateRole" ,updateRole )
};
