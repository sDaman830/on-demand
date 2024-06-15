const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
import { identifyImage } from "./identifyImage.js";
const app = express();
const port = process.env.PORT || 4000;

const apiKey = "Wvcrq40USZEOajv8BI3FvcPL81XzLrtS";
const externalUserId = "team";

app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
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

    if (url) {
      identifiedFood = await identifyImage(url);
      if (!identifiedFood) {
        return res
          .status(500)
          .json({ error: "Failed to identify food from image URL" });
      }
    }

    const query = `can a person with ${disease}, age ${age} eat ${identifiedFood}`;
    const alternativesQuery = `give alternatives to ${identifiedFood} with their shopping url`;

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

    const [queryResponse, alternativesResponse] = await Promise.all([
      axios.post(queryUrl, queryPayload, { headers }),
      axios.post(queryUrl, alternativesPayload, { headers }),
    ]);

    if (queryResponse.status !== 200 || alternativesResponse.status !== 200) {
      return res
        .status(500)
        .json({ error: "Failed to get answers from the API" });
    }

    const response = {
      foodQueryResponse: queryResponse.data,
      alternativesResponse: alternativesResponse.data,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
