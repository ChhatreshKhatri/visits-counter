const express = require("express");
const cors = require("cors");
const svgBadge = require("./svgBadge");
// const { port, mongourl } = require('./config.json');
require("dotenv").config();
const port = process.env.PORT;
const mongourl = process.env.MONGODB_URI;

// Create an express instance and setup middlewares
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/astro/dist'));

// Initilize mongoDB connection
const mongoose = require("mongoose");
const database = require("./database/mongo.js");
mongoose
  .connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.log("Unable to connect to MongoDB.\nError: " + err));

// Disable caching
app.use(function (req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revaluniqueIDate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});

async function processSVG(req, res) {
  // Get values from query and parameter
  const labelBGColor = req.query.labelBGColor || "484848";
  const countBGColor = req.query.countBGColor || "1CA2F1";
  const labelTextColor = req.query.labelTextColor || "FFFFFF";
  const countTextColor = req.query.countTextColor || "FFFFFF";
  const shadow = req.query.shadow || "1";
  const shadowOpacity = req.query.shadowOpacity || "30";
  const label = req.query.label || "VISITS";
  const uniqueID = req.params.uniqueID;
  const swap = req.query.swap || "0";
  const passKey = req.query.passKey || uniqueID;
  const setIDCount = req.query.setIDCount || "0";

  // Get the current visits count
  const visits = await database.visitsBadge(uniqueID, setIDCount, passKey);

  // Create the SVG Badge
  let svg = svgBadge(label, shadow, shadowOpacity, swap, labelBGColor, countBGColor, labelTextColor, countTextColor, visits);

  // Send the SVG Badge
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
}
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
app.get("/:uniqueID", (req, res) => processSVG(req, res));
app.listen(port, () => console.log(`Ready on port ${port}.`));
