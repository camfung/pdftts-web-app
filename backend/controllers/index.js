const express = require("express");
const userController = require("./UserController");
const GoogleController = require("./GoogleController.js");
const openAiController = require("./OpenAiController");

const router = express.Router();

// User routes
router.get("/users", userController.getUsers);
router.get("/getCredits", userController.getCredits)
router.post("/users", userController.createUser);

// spotify routes
router.get("/spotify-login", GoogleController.GoogleLogin);
router.get("/callback", GoogleController.callback);

module.exports = router;
