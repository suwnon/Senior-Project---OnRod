const express = require("express");
const app = express();
const routeAuth = require("./routes/auth.js");
const routeCar = require("./routes/car.js");
const routeFile = require("./routes/upload.js");
const routeUser = require("./routes/user.js");
const routeAppov = require("./routes/appov.js");
const bodyParser = require("body-parser");

const cors = require("cors");
const path = require("path");

app.use(cors());
app.use('/image', express.static(path.join(__dirname, 'uploads/')))
// app.use(express.urlencoded({ extended: true }));
routeFile(app);

app.use(bodyParser.json())
routeAuth(app);
routeCar(app);
routeUser(app)
routeAppov(app)


app.listen(3000);
