// src/app.js

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const UserRoute = require("./Routes/api");
const bodyParser = require("body-parser");
dotenv.config();
require("./config/database");

const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", UserRoute);

// Middleware, routes, and other configuration

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
