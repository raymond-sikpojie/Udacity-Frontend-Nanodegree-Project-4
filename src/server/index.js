const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");

const app = express();

// app.use(express.static('dist'))
app.use(express.static("src/client"));

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log(path.join(__dirname, "../../.env"));

app.get("/", function (req, res) {
  //  res.sendFile("dist/index.html");
  //   res.sendFile(path.resolve('src/client/views/index.html'))
  //   res.sendFile("./client/views/index.html");
  res.sendFile(path.join(__dirname, "../client/views/index.html"));
  console.log("response sent");
});

//Require the Aylien npm package
const aylien = require("aylien_textapi");

// Set Aylien API credentials
const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

app.get("/analysis", function (req, res) {
  textapi.sentiment(
    {
      text: "John is a very good football player!",
    },
    function (error, response) {
      if (error === null) {
        // console.log(response);
        res.send(response);
      } else {
        console.log(error);
      }
    }
  );
});

// console.log(process.env.API_KEY);

// Designates what port the app will listen to for incoming requests
const port = 8081;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
