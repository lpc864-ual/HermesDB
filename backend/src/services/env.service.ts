import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  assistantUrl(): string {
    return (
      this.configService.get<string>('ASSISTANT_URL') ||
      'http://localhost:11434'
    );
  }

  assistantMaxTokens(): number {
    return this.configService.get<number>('ASSISTANT_MAX_TOKENS') || 2000;
  }

  assistantModel(): string {
    return this.configService.get<string>('ASSISTANT_MODEL') || 'sqlcoder';
  }

  messagesMax(): number {
    return this.configService.get<number>('MESSAGES_MAX') || 10;
  }
}
