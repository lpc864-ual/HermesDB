import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Conversation,
  ConversationDocument,
  Message,
  RoleEnum,
} from '../schemas/conversation.schema';
import { ChatService } from './chat.service';
import { EnvService } from './env.service';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    private readonly chatService: ChatService,
    private readonly envService: EnvService,
  ) {}

  async createConversation(data: Conversation): Promise<Conversation> {
    const contextMessage: Message = {
      role: RoleEnum.USER,
      content: `Here is the database schema. Use this only as context for future SQL queries. Do not reply to this message. ${data.ddl}`,
    };

    const assistantMessage = await this.chatService.sendMessage([
      contextMessage,
    ]);

    return this.conversationModel.create({
      ...data,
      messages: [contextMessage, assistantMessage],
    });
  }

  async updateConversation(
    conversationId: string,
    data: Partial<Conversation>,
  ): Promise<Conversation> {
    const result = await this.conversationModel
      .findByIdAndUpdate(conversationId, data, { new: true })
      .exec();

    if (!result)
      throw new NotFoundException(
        `Conversation with id ${conversationId} not found`,
      );

    return result;
  }

  async deleteConversation(conversationId: string): Promise<void> {
    const result =
      await this.conversationModel.findByIdAndDelete(conversationId);

    if (!result) throw new NotFoundException();
  }

  async addMessage(
    conversationId: string,
    userMessage: Message,
  ): Promise<Conversation> {
    const conversation = await this.conversationModel.findById(conversationId);

    if (!conversation) throw new NotFoundException();

    if (
      conversation.messages.filter((m) => m.role === RoleEnum.USER).length >=
      this.envService.messagesMax() + 1
    )
      throw new ConflictException('Maximum number of messages reached');

    const assistantMessage = await this.chatService.sendMessage([userMessage]);

    /*
    TODO: execute sql generate from assistant
     */

    const result = await this.conversationModel
      .findByIdAndUpdate(
        conversationId,
        {
          $push: {
            messages: { $each: [userMessage, assistantMessage] },
          },
        },
        { new: true },
      )
      .exec();

    if (!result) throw new NotFoundException();

    return result;
  }

  async getConversations(): Promise<Conversation[]> {
    return this.conversationModel.find().sort({ updatedAt: -1 }).exec();
  }

  async getConversation(conversationId: string): Promise<Conversation> {
    const result = await this.conversationModel.findById(conversationId).exec();

    if (!result) throw new NotFoundException();

    return result;
  }
}
