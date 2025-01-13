import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  async sendMessage(@Body() body: { question: string }) {
    const userMessage = body.question;
    await this.chatService.saveMessage('user', userMessage);

    let botResponse = await this.chatService.getResponse(userMessage);

    if (botResponse.includes('Nu am găsit un răspuns')) {
      botResponse += ' Caut răspunsuri pe internet...';
    }

    await this.chatService.saveMessage('bot', botResponse);
    return { message: botResponse };
  }

  @Get('messages')
  async getMessages() {
    return this.chatService.getMessages();
  }
}
