import axios from 'axios';

export const askAI = async (message) => {
  try {
    const response = await axios.post('http://localhost:3001/api/ask', { message });
    return response.data.reply;  // Esperando a resposta com a chave "reply"
  } catch (error) {
    console.error('Error in askAI:', error.response || error.message);
    throw error;
  }
};
