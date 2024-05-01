const { createAppov, getAppovAll, getAppovById, updateStatus, addComment, getComment,updateAppointmentSchedule } = require("../handle/appov");
module.exports = (app) => {
    app.post("/appov", createAppov);
    app.get("/appov", getAppovAll);
    app.get("/appov/:id", getAppovById);
    app.put("/appov/:id/:car_id", updateStatus);
    app.put("/approve/:id/:car_id", updateAppointmentSchedule);
    app.post("/addComment/:carId/:userId", addComment);
    app.get("/comment/:carId", getComment);
};
