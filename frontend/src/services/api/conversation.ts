export async function createConversation(url: string, options?: RequestInit) {
  return fetch('/api/conversation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
    ...options, 
  }).then(res => res.json());
}