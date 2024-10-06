const express = require("express");
const userController = require("./UserController");
const GoogleController = require("./GoogleController.js");
const fileController = require("./FileController.js")
const authController = require("./AuthController.js")

const router = express.Router();

// User routes
router.get("/users", userController.getUsers);
router.get("/getCredits", userController.getCredits)
router.post("/users", userController.createUser);

// spotify routes
router.get("/spotify-login", GoogleController.GoogleLogin);
router.get("/callback", GoogleController.callback);

// file routes 
router.post("/upload", fileController.getFile)

// auth controller
router.get("/isAuthenticated", authController.isAuthenticated)

module.exports = router;
