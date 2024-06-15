const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const identifyImage = require("./IndentifyImage");
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

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
