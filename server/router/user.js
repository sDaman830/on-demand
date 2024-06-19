const express = require("express");
const router = express.Router();
// controller
const { login } = require("../controllers/autoAuth");
const { auth } = require("../middleware/auth");
const User = require("../models/userSchema");
const { userDetails } = require("../controllers/userDetails");
const { createUser, manualLogin } = require("../controllers/manualLogin");
const axios = require("axios");
const apiKey = "Wvcrq40USZEOajv8BI3FvcPL81XzLrtS";
const externalUserId = "team";
const identifyImage = require("../IndentifyImage");
const { spawn } = require("child_process");
const fs = require("fs");

router.post("/create-user", createUser);
router.post("/manualLogin", manualLogin);
router.post("/authlogin", login);
router.get("/check-Login", auth, userDetails);

router.post("/chat", async (req, res) => {
  try {
    const sessionUrl = "https://gateway-dev.on-demand.io/chat/v1/sessions";
    const headers = {
      apikey: apiKey,
      "Content-Type": "application/json",
    };
    const body = {
      pluginIds: [],
      externalUserId,
    };

    const sessionResponse = await axios.post(sessionUrl, body, { headers });

    if (sessionResponse.status !== 201) {
      return res
        .status(sessionResponse.status)
        .json({ error: "Failed to create chat session" });
    }

    const chatSession = sessionResponse.data;
    const sessionId = chatSession?.chatSession?.id;

    if (!sessionId) {
      return res.status(500).json({ error: "No session ID received" });
    }

    const { age, disease, url, food } = req.body;
    let identifiedFood = food;
    console.log("URL", url);
    if (url !== "" || !!url) {
      identifiedFood = await identifyImage(url, apiKey);
      identifiedFood = identifiedFood.chatMessage.answer;
      if (!identifiedFood) {
        return res
          .status(500)
          .json({ error: "Failed to identify food from image URL" });
      }
    }

    const query = `can a person with ${disease}, age ${age} eat ${identifiedFood} give your answer`;
    const alternativesQuery = `give alternatives to ${identifiedFood} with their shopping url`;
    console.log(query);
    const queryPayload = {
      endpointId: "predefined-openai-gpt4o",
      query,
      pluginIds: ["plugin-1713924030", "plugin-1713924030"],
      responseMode: "sync",
    };

    const alternativesPayload = {
      ...queryPayload,
      query: alternativesQuery,
      pluginIds: ["plugin-1713924030", "plugin-1716119225"],
    };

    const queryUrl = `https://gateway-dev.on-demand.io/chat/v1/sessions/${sessionId}/query`;

    const queryResponse = await axios.post(queryUrl, queryPayload, { headers });
    const alternativesResponse = await axios.post(
      queryUrl,
      alternativesPayload,
      { headers }
    );

    console.log("Query Response:", queryResponse.data);
    console.log("Alternatives Response:", alternativesResponse.data);
    if (queryResponse.status !== 200 || alternativesResponse.status !== 200) {
      return res
        .status(500)
        .json({ error: "Failed to get answers from the API" });
    }

    const response = {
      foodQueryResponse: queryResponse.data,
      alternativesResponse: alternativesResponse.data,
    };

    // Store the query and response in the user's document
    const userId = "66724e46a527dfcd21340981"; // Assuming the user ID is stored in req.user._id after authentication
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.queries.push({
      query: query,
      response: JSON.stringify(response), // Storing the response as a string
      timestamp: new Date(), // Store the current date and time
    });
    console.log(user.queries);

    await user.save();

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
