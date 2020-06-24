const express = require("express");

const db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "oussama2011",
    database: "smart-brain",
  },
});

const app = express();

const bodyParser = require("body-parser");

const bcrypt = require("bcrypt-nodejs");

const cors = require("cors");

const register = require("./controllers/register");

const signin = require("./controllers/signin");

const profile = require("./controllers/profile");

const image = require("./controllers/image");

app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("it's working");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImageGet(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

//const PORT = process.env.PORT;

app.listen(process.env.PORT || 3050, () => {
  console.log("All Good");
});