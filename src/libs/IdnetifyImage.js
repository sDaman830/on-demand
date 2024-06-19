export async function identifyImage(url, apikey) {
  const payload = {
    endpointId: "predefined-openai-gpt4o",
    query: `${url} identify the image in the url in 2-3 words , ignore all the previous chat history and every image url is new`,
    pluginIds: ["plugin-1713924030"],
    responseMode: "sync",
  };

  try {
    const response = await fetch(
      "https://gateway-dev.on-demand.io/chat/v1/sessions/665dc108ab2a2741c3ec3ae0/query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: apikey,
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
