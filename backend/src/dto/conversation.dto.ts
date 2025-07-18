import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

import { IsDatabaseUrl } from '../decorators/validate-db-url.decorator';
import { IsFileExtensionAndSize } from '../decorators/validate-file.decorator';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  @IsDatabaseUrl()
  @ValidateIf((o) => !o.ddl)
  url?: string;

  @IsNotEmpty()
  @IsFileExtensionAndSize(['.sql'], 512)
  @ValidateIf((o) => !o.url)
  // @ts-ignore
  ddl?: Express.Multer.File;

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
