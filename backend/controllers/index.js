const express = require("express");
const userController = require("./UserController");
const GoogleController = require("./GoogleController.js");
const fileController = require("./FileController.js");
const authController = require("./AuthController.js");

const router = express.Router();

// User routes
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve all users from the database.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID
 *                   name:
 *                     type: string
 *                     description: The user name
 */
router.get("/users", userController.getUsers);
/**
 * @swagger
 * /getCredits:
 *   get:
 *     summary: Get credits for a user
 *     responses:
 *       200:
 *         description: User credits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 credits:
 *                   type: number
 */
router.get("/getCredits", userController.getCredits);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/users", userController.createUser);

// spotify routes
/**
 * @swagger
 * /spotify-login:
 *   get:
 *     summary: Login via Spotify
 *     responses:
 *       302:
 *         description: Redirects to Spotify login
 */
router.get("/spotify-login", GoogleController.GoogleLogin);
/**
 * @swagger
 * /callback:
 *   get:
 *     summary: Spotify login callback
 *     responses:
 *       200:
 *         description: Successfully authenticated with Spotify
 */
router.get("/callback", GoogleController.callback);

// auth controller
/**
 * @swagger
 * /isAuthenticated:
 *   get:
 *     summary: Check if user is authenticated
 *     responses:
 *       200:
 *         description: User is authenticated
 *       401:
 *         description: User is not authenticated
 */
router.get("/isAuthenticated", authController.isAuthenticated);
/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout the user
 *     responses:
 *       200:
 *         description: User logged out
 */
router.get("/logout", authController.logout);

// file controller
router.post(
  "/single",
  fileController.upload.single("file"),
  fileController.fileUpload
);

module.exports = router;
