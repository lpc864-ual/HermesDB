import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  CreateConversationDto,
  NewMessageDto,
  UpdateConversationDto,
} from '../dto/conversation.dto';
import { RoleEnum } from '../schemas/conversation.schema';
import { AppService } from '../services/app.service';
import { DbIntrospectorService } from '../services/db-introspector.service';

@Controller()
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
  async createConversation(@Body() body: CreateConversationDto) {
    const ddl = await this.dbIntrospector.getDDLFromUrl(body.url);

    return this.appService.createConversation(ddl, body.url);
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
