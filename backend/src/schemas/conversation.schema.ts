import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

export enum RoleEnum {
  USER = 'user',
  ASSISTANT = 'assistant',
}

@Schema({ _id: false, timestamps: false })
export class Message {
  @Prop({ required: true, enum: RoleEnum })
  role!: RoleEnum;

  @Prop({ required: true })
  content!: string;
}

const MessageSchema = SchemaFactory.createForClass(Message);

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ type: String, required: false })
  url?: string;

  @Prop({ type: String, required: true })
  ddl!: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: [MessageSchema], default: [] })
  messages!: Message[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
