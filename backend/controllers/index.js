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

// auth controller
router.get("/isAuthenticated", authController.isAuthenticated)
router.get("/logout", authController.logout)

// file controller 
router.post('/single', fileController.fileUpload)

module.exports = router;
