import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { GoogleSearchController } from './chat/search.controler';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://sami:sami@sami.gnams.mongodb.net/sami?retryWrites=true&w=majority&appName=sami',
    ),
    ChatModule,
  ],
  controllers: [GoogleSearchController],
})
export class AppModule {}
