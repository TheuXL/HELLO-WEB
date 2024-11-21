import React, { useState } from 'react';
import { askAI } from '../api';

const Chat = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const aiResponse = await askAI(input);
      setResponse(aiResponse);
    } catch (error) {
      setResponse('Error communicating with the AI.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Enviar</button>
      </form>
      {response && <p>AI Response: {response}</p>}
    </div>
  );
};

export default Chat;
