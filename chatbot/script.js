const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatHistory = document.querySelector('.chat-history');

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
  const userMessage = userInput.value;
  userInput.value = '';

  // Adicionar a mensagem do usuário ao histórico
  appendMessage('user', userMessage);


function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', `${sender}-message`);
  messageElement.textContent = message;
  chatHistory.appendChild(messageElement);

  // Rolar para baixo para mostrar a última mensagem
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

async function fetchResponse(message) {
  // Substitua "YOUR_API_KEY" pela sua chave da API do Google Gemini
  const apiKey = 'AIzaSyBCVK1OC5pYomKkEiX078N--2qzEsOls9o';
  const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateContent?key=${apiKey}`;

  const requestBody = {
    prompt: {
      text: message
    }
  };

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].output;
    } else {
      throw new Error('Resposta da API inválida.');
    }
  } catch (error) {
    throw error;
  }
}


  // Chamar a API do Google Gemini
  fetchResponse(userMessage)
    .then(botMessage => {
      appendMessage('bot', botMessage);
    })
    .catch(error => {
      console.error('Erro ao obter resposta:', error);
      appendMessage('bot', 'Ocorreu um erro ao processar sua solicitação.');
    });
}