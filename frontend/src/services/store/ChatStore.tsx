import { create } from 'zustand';

export type Message = {
  role: 'user' | 'ai';
  content: string;
};

export type Chat = {
  id: string;
  messages: Message[];
};

type ChatState = {
  chats: Chat[];
  currentChatId: string | null;
  addChat: () => string;
  setCurrentChat: (id: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  getCurrentChat: () => Chat | undefined;
};

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  currentChatId: null,
  addChat: () => {
    const nextId = (get().chats.length + 1).toString();
    set((state) => ({
      chats: [...state.chats, { id: nextId, messages: [] }],
      currentChatId: nextId,
    }));
    return nextId;
  },
  setCurrentChat: (id) => set({ currentChatId: id }),
  addMessage: (chatId, message) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      ),
    }));
  },
  getCurrentChat: () => {
    const { chats, currentChatId } = get();
    return chats.find((chat) => chat.id === currentChatId);
  },
}));
