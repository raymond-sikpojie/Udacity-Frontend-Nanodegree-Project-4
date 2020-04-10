const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

var path = require("path");
const express = require("express");

const app = express();

// app.use(express.static("src/client"));

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const directoryPath = path.join(__dirname, "../client/views");
console.log(directoryPath);

// Specify the directory from where to load files
app.use(express.static(path.join(__dirname, "../../dist")));
// app.use(express.static(directoryPath));

app.get("/", function (req, res) {
  // res.sendFile(path.join(__dirname, "../client/views/index.html"));
  // res.sendFile("index.html");
});

//Require the Aylien npm package
const aylien = require("aylien_textapi");

// Set Aylien API credentials
const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

//Variable which holds the data from POST request
const appData = {};

// POST Request which collects the form input data
app.post("/inputData", (req, res) => {
  console.log("text/url received");
  appData.text = req.body.text;
});

// GET Request from Aylien Api
app.get("/analysis", function (req, res) {
  textapi.sentiment(
    {
      text: appData.text,
    },
    function (error, response) {
      if (error === null) {
        console.log("response  sent");
        res.send(response);
      } else {
        console.log(error);
      }
    }
  );
});

// Designates what port the app will listen to for incoming requests
const port = 8081;
app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
