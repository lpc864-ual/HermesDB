import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { ChatOllama } from '@langchain/ollama';
import { Injectable } from '@nestjs/common';

import { Message, RoleEnum } from '../schemas/conversation.schema';

@Injectable()
export class ChatService {
  constructor(private readonly assistant: ChatOllama) {}

  async sendMessage(messages: Message[]): Promise<Message> {
    const chatHistory = messages.map((msg) =>
      msg.role === RoleEnum.USER
        ? new HumanMessage(msg.content)
        : new AIMessage(msg.content),
    );
    const response = await this.assistant.invoke(chatHistory);

    return { role: RoleEnum.ASSISTANT, content: response.content.toString() };
  }
}
