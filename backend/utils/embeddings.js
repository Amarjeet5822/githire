const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

async function generateEmbedding(text) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text,
    });
    return response.data.data[0].embedding;
  } catch (error) {
    console.error("Embedding Error:", error);
    return [];
  }
}

module.exports = { generateEmbedding };
