import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IsDatabaseUrl } from '../decorators/validate-db-url.decorator';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  @IsDatabaseUrl()
  url!: string;

  @IsString()
  @IsOptional()
  title?: string;
}

export class UpdateConversationDto {
  @IsString()
  @IsOptional()
  title?: string;
}

export class NewMessageDto {
  @IsString()
  @IsNotEmpty()
  content!: string;
}
