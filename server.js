const mongoose = require("mongoose");
const express = require("express");
var jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost/reactauth", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to local db");
  });

const dealer = mongoose.Schema({ car: String, model: String });
const Dealer = mongoose.model("car", dealer);

app.post("/create", (req, res) => {
  Dealer.create({ car: req.body.car, model: req.body.model }).then((res) => {
    // console.log(res);
  });
  res.send("Done");
});

app.post("/login", async (req, res) => {
  await Dealer.findOne({ car: req.body.car })
    .then(async (rest) => {
      id = rest._id;
      token = jwt.sign({ id }, "secret", { expiresIn: "1hr" });
      console.log(token);
      res.cookie("jwt", token);
      res.send("Successful Login");
    })
    .catch(() => {
      res.send("No user");
    });
});

const authMiddleware = (req, res, next) => {
  token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret", (err, decode) => {
      if (err) {
        console.log("Token tampered");
      } else {
        console.log(decode.id);
        next();
      }
    });
  } else {
    res.send("No Token Exists");
  }
};

app.get("/protected", authMiddleware, (req, res) => {
  res.send("success");
});

app.listen(4000, () => {
  console.log("Listening at Port 4000");
});
