//Express server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");
const profile = require("./controllers/profile");

//Database set up
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "",
    database: "smartbrain",
  },
});

//use of express, json(), and cors
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//POST request for signin
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

//POST request for register
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

//PUT request for image
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

//GET request for profile
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

//Listening to this server
app.listen(2000, () => {
  console.log("App running on 2000");
});

//htpps/bcrypt to generate a hash, so it would be safer for users
