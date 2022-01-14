const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const API_PORT = 4000;
const app = express();
const TestData = require("./data.js");


// CONNECTION TO DB
app.use(cors());
const router = express.Router();
const dbRoute =
"mongodb+srv://admin:admin@vertricalchallenge.rkzne.mongodb.net/Vertrical?retryWrites=true&w=majority"
mongoose.connect(dbRoute, { useNewUrlParser: true} );
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


//SEARCH ENGINE API
  router.get("/search", (req, res) => {
    console.log(req.headers)
    TestData.find({ Title: new RegExp(req.headers.title, 'i')  }, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data }); 
    })
}); 

// APPEND API 
app.use("/api", router);

// LAUNCH BACKEND
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
