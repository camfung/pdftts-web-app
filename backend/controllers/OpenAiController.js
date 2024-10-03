const express = require("express");
const router = express.Router();
const OpenAIService = require("../services/OpenAiService");
const { executeQuery } = require("../dao/db");

// Initialize your OpenAIService and OpenAIDAO
const openAIService = new OpenAIService();
