import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question extends Document {
  @Prop({ required: true })
  question!: string;

  @Prop({ required: true })
  answer!: string;

  @Prop({ default: false })
  isApproved!: boolean;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
