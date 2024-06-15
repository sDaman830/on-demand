async function identifyImage(url) {
  const payload = {
    endpointId: "predefined-openai-gpt4o",
    query: `${url} identify the image in the url in 2-3 words`,
    pluginIds: ["plugin-1712327325", "plugin-1713924030"],
    responseMode: "sync",
  };

  try {
    const response = await fetch(
      "https://gateway-dev.on-demand.io/chat/v1/sessions/665dc108ab2a2741c3ec3ae0/query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Example usage:
