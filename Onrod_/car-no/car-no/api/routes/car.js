const { createCar, getall, getbyId , getCarByStatus } = require("../handle/car");

module.exports = (app) => {
  app.post("/car", createCar);
  app.post("/getCar", getall);
  app.get("/car/:id", getbyId);
  app.get("/carby/:status", getCarByStatus);
};
