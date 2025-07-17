import { ChatOllama } from '@langchain/ollama';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './controllers/app.controller';
import { ConversationSchema } from './schemas/conversation.schema';
import { AppService } from './services/app.service';
import { ChatService } from './services/chat.service';
import { DbIntrospectorService } from './services/db-introspector.service';
import { EnvService } from './services/env.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'Conversation', schema: ConversationSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: ChatOllama,
      useFactory: async (envService: EnvService) =>
        new ChatOllama({
          baseUrl: envService.assistantUrl(),
          model: envService.assistantModel(),
        }),
      inject: [EnvService],
    },
    AppService,
    ChatService,
    EnvService,
    DbIntrospectorService,
  ],
})
export class AppModule {}
