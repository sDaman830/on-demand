const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

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

    // Check if the request contains text data
    const query = req.body.query;
    if (query) {
      // Prepare the request body for text query
      const queryPayload = {
        endpointId: "predefined-openai-gpt4o",
        query,
        pluginIds: ["plugin-1713962163"],
        responseMode: "sync",
      };

      const queryUrl = `https://gateway-dev.on-demand.io/chat/v1/sessions/${sessionId}/query`;
      const queryResponse = await axios.post(queryUrl, queryPayload, {
        headers,
      });

      if (queryResponse.status !== 200) {
        return res
          .status(queryResponse.status)
          .json({ error: "Failed to get answer" });
      }

      res.json(queryResponse.data);
    } else {
      res.status(400).json({ error: 'Invalid request. Must include "query"' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
