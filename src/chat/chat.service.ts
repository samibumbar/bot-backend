import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ChatService {
  private readonly questionsFilePath = join(__dirname, '../db/questions.json');

  async getChatResponse(message: string): Promise<string> {
    try {
      const data = await fs.readFile(this.questionsFilePath, 'utf-8');
      const questions = JSON.parse(data);

      const reply = questions[message];
      if (reply) {
        return reply;
      } else {
        return 'Îmi pare rău, nu am un răspuns pentru această întrebare.';
      }
    } catch (error) {
      console.error('Error reading questions file:', error);
      throw new Error('Failed to get response from questions file');
    }
  }
}
