import mongoose from 'mongoose';
import { ChatService } from './chat/chat.service';
import { QuestionSchema } from './chat/models/question.schema';
import { MessageSchema } from './chat/models/message.schema';

async function main() {
  await mongoose.connect('mongodb+srv://sami:sami@sami.gnams.mongodb.net/sami');

  const QuestionModel = mongoose.model('Question', QuestionSchema);
  const MessageModel = mongoose.model('Message', MessageSchema);

  const chatService = new ChatService(QuestionModel, MessageModel);

  const question = 'Ce este MongoDB?';
  const response = await chatService.getResponse(question);
  console.log('Response:', response);

  mongoose.connection.close();
}

main().catch((err) => console.error(err));
