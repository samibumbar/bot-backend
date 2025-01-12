import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
