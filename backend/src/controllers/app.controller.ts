import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { validateOrReject } from 'class-validator';
import { memoryStorage } from 'multer';

import {
  CreateConversationDto,
  NewMessageDto,
  UpdateConversationDto,
} from '../dto/conversation.dto';
import { RoleEnum } from '../schemas/conversation.schema';
import { AppService } from '../services/app.service';
import { DbIntrospectorService } from '../services/db-introspector.service';

@Controller('api/conversation')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dbIntrospector: DbIntrospectorService,
  ) {}

  @Get()
  async getConversations() {
    return this.appService.getConversations();
  }

  @Get(':id')
  async getConversation(@Param('id') id: string) {
    return this.appService.getConversation(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('schema', {
      storage: memoryStorage(),
    }),
  )
  async createConversation(
    // @ts-ignore
    @UploadedFile() ddl: Express.Multer.File,
    @Body() body: any,
  ) {
    const dto = new CreateConversationDto();

    dto.url = body && 'url' in body ? body.url : undefined;
    dto.title = body?.title;
    dto.ddl = ddl;

    try {
      await validateOrReject(dto);
    } catch (errors) {
      throw new BadRequestException(errors);
    }

    const schema = body.url
      ? await this.dbIntrospector.getDDLFromUrl(body.url)
      : ddl.buffer.toString('utf-8');

    return this.appService.createConversation({
      ...dto,
      ddl: schema,
      title: dto.title ?? new Date().toISOString(),
      messages: [],
    });
  }

  @Post(':id')
  async addMessage(@Param('id') id: string, @Body() message: NewMessageDto) {
    return this.appService.addMessage(id, { ...message, role: RoleEnum.USER });
  }

  @Put(':id')
  async updateConversation(
    @Param('id') id: string,
    @Body() body: UpdateConversationDto,
  ) {
    return this.appService.updateConversation(id, body);
  }

  @Delete(':id')
  async deleteConversation(@Param('id') id: string) {
    return this.appService.deleteConversation(id);
  }
}
