import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: process.env.BASE_URL,
});

export const getResponseFromAI = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      model: "nvidia/llama-3.1-nemotron-70b-instruct",
      messages: [{ role: "user", content: message }],
      temperature: 0.5,
      top_p: 1,
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching response:', error);
    throw error;
  }
};
