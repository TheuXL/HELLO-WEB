import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importando o módulo CORS
import { OpenAI } from 'openai';  // Certifique-se de instalar o pacote 'openai' via npm

dotenv.config(); // Carregar variáveis de ambiente

const app = express();
const port = 3001;

// Configurando o CORS para permitir requisições do frontend
app.use(cors({
  origin: 'http://localhost:3000', // Substitua pelo domínio do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type'], // Cabeçalhos permitidos
}));

// Middleware para analisar o corpo das requisições em JSON
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,  // A chave de API da NVIDIA carregada do .env
  baseURL: 'https://integrate.api.nvidia.com/v1',  // Endpoint da NVIDIA
});

// Rota que receberá as requisições do frontend
app.post('/api/ask', async (req, res) => {
  const { message } = req.body;
  try {
    // Fazendo a requisição para a API da NVIDIA
    const completion = await openai.chat.completions.create({
      model: "nvidia/llama-3.1-nemotron-70b-instruct", // Modelo da NVIDIA
      messages: [{ role: "user", content: message }],
      temperature: 0.5,
      top_p: 1,
      max_tokens: 1024,
      stream: false,  // Desativando o streaming por enquanto
    });

    // Retornando a resposta para o frontend
    const aiReply = completion.choices[0]?.message?.content || 'No response from AI';
    res.json({ reply: aiReply });
  } catch (error) {
    console.error('Error communicating with NVIDIA API:', error);
    res.status(500).json({ error: 'Error communicating with NVIDIA API' });
  }
});

// Inicializando o servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
