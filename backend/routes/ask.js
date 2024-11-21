import express from 'express';
import { getResponseFromAI } from '../openaiService.js';

const router = express.Router();

// Rota para interagir com a IA
router.post('/ask', async (req, res) => {
  const { message } = req.body;

  // Verificando se a mensagem foi enviada
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing "message" in request body' });
  }

  try {
    // Chamando o serviço que interage com a API da IA
    const response = await getResponseFromAI(message);

    // Retornando a resposta da IA
    res.json({ response });
  } catch (error) {
    console.error('Error fetching AI response:', error);

    // Diferenciando erros para feedback ao cliente
    if (error.response) {
      // Erros de resposta da API
      return res.status(error.response.status || 500).json({ 
        error: error.response.data || 'Error from AI API' 
      });
    }

    // Erro genérico
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

export default router;
