import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SnippetDocument = Snippet & Document;

export enum SnippetType {
  LINK = 'link',
  NOTE = 'note',
  COMMAND = 'command',
}

@Schema({ timestamps: true })
export class Snippet {
  @Prop({ required: true, index: 'text' })
  title: string;

  @Prop({ required: true, index: 'text' })
  content: string;

  @Prop({ type: [String], default: [], index: true })
  tags: string[];

  @Prop({ 
    type: String, 
    enum: Object.values(SnippetType), 
    required: true 
  })
  type: SnippetType;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);

// Create text index for search
SnippetSchema.index({ title: 'text', content: 'text' });

