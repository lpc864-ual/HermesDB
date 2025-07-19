export async function createConversation(url: string, options?: RequestInit) {
  return fetch('/api/conversation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
    ...options, 
  }).then(res => res.json());
}

export async function addMessageToApi(chatId: string, message: string, options?: RequestInit) {
  return fetch(`/api/conversation/${chatId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message }),
    ...options,
  }).then(res => res.json());
}

export async function mockAddMessageToApi(chatId: string, message: string) {
  return new Promise<{ content: string }>((resolve) => {
    setTimeout(() => {
      resolve({ content: `Respuesta simulada a: ${message}` });
    }, 4000); // simula 1.5s de espera
  });
}