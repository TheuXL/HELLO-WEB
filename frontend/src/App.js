import React, { useState } from 'react';
import './App.css';
import { askAI } from './api';
import ReactMarkdown from 'react-markdown'; // Importa a biblioteca de Markdown

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [isSending, setIsSending] = useState(false); // Para evitar envios múltiplos

  const handleSendMessage = async () => {
    if (!input.trim() || isSending) return; // Evita envio vazio ou duplicado

    setIsSending(true); // Bloqueia novos envios enquanto processa

    setMessages((prev) => [...prev, { type: 'user', text: input }]);
    setShowWelcome(false);

    try {
      const aiResponse = await askAI(input);
      setMessages((prev) => [
        ...prev,
        { type: 'ai', text: aiResponse }, // Armazena a resposta da API
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: 'ai', text: 'Erro ao se comunicar com a IA.' },
      ]);
    }

    setInput(''); // Limpa o campo de entrada
    setIsSending(false); // Libera para novos envios
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Envia mensagem com Enter (sem Shift)
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Resposta copiada para a área de transferência!');
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="hello">Hello</h1>
        {showWelcome && (
          <div className="welcome">
            <p>Bem-vindo ao assistente inteligente.</p>
          </div>
        )}
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'user' ? 'user' : 'ai'}`}
          >
            {message.type === 'ai' ? (
              // Renderiza a resposta da IA como Markdown
              <ReactMarkdown className="ai-response">{message.text}</ReactMarkdown>
            ) : (
              <p>{message.text}</p>
            )}
            {message.type === 'ai' && (
              <button
                className="copy-button"
                onClick={() => handleCopyToClipboard(message.text)}
              >
                Copiar
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="input-box">
        <textarea
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} // Tratamento de teclas
          rows={1} // Altura inicial do campo
        />
        <button onClick={handleSendMessage} disabled={isSending}>
          {isSending ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}

export default App;
