import { ChatService } from './chat/chat.service';

async function testChatService() {
  const chatService = new ChatService();

  try {
    const message = 'Cum construiesc un server?';
    const response = await chatService.getChatResponse(message);
    console.log('Răspuns primit din fișierul JSON:', response);
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        'Eroare la testarea serviciului ChatService:',
        error.message,
      );
    } else {
      console.error('Eroare necunoscută:', error);
    }
  }
}

testChatService();
