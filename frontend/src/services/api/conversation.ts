export async function createConversation(params: { file?: File; url?: string; title?: string }, options?: RequestInit) {
  
  if (!params.file && !params.url) {
    throw new Error('You must send a file or URL');
  }

  if (params.file && params.url) {
    throw new Error('You must pass only one file or only one URL, but not both');
  }

  let fetchOptions: RequestInit;

  if (params.file) {
    // Si hay archivo, usamos FormData
    const formData = new FormData();
    formData.append('schema', params.file);
    if (params.title) formData.append('title', params.title);

    fetchOptions = {
      method: 'POST',
      body: formData,
      ...options,
    };
  } else {
    fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: params.url,
        title: params.title,
      }),
      ...options,
    };
  }

  return fetch('/api/conversation', fetchOptions).then(res => res.json());
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