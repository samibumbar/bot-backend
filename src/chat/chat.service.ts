import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './models/question.schema';
import { Message } from './models/message.schema';
import { searchGoogle } from './google-search.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async getResponse(userQuestion: string): Promise<string> {
    console.log('Question received:', userQuestion);

    const existingQuestion = await this.questionModel.findOne({
      question: userQuestion,
    });

    if (existingQuestion) {
      console.log('Answer found in database:', existingQuestion.answer);
      await this.saveMessage('bot', existingQuestion.answer);
      return existingQuestion.answer;
    }

    try {
      const googleResults = await searchGoogle(userQuestion);
      console.log('Google Results:', googleResults);

      if (googleResults && googleResults.length > 0) {
        const responseText = this.processGoogleResults(googleResults);

        await this.questionModel.create({
          question: userQuestion,
          answer: responseText,
        });

        await this.saveMessage('bot', responseText);
        return responseText;
      }
    } catch (error) {
      console.error('Google Search API error:', error);
    }

    const noResponseText =
      'Nu am un răspuns pentru această întrebare. Poți să-mi spui răspunsul?';
    console.log('Returning default response:', noResponseText);
    await this.saveMessage('bot', noResponseText);
    return noResponseText;
  }

  private processGoogleResults(results: any[]): string {
    const bestResult = results[0];
    return `Conform ${bestResult.title}, răspunsul este: ${bestResult.snippet}. Mai multe detalii: ${bestResult.link}`;
  }

  async saveMessage(sender: 'user' | 'bot', text: string) {
    await this.messageModel.create({ sender, text, timestamp: new Date() });
  }

  async getMessages() {
    return this.messageModel.find().sort({ timestamp: 1 });
  }
}
