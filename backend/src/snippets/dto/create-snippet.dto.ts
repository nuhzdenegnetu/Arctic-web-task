import { 
  IsString, 
  IsNotEmpty, 
  IsArray, 
  IsEnum, 
  IsOptional,
  ArrayNotEmpty,
  MaxLength 
} from 'class-validator';
import { SnippetType } from '../schemas/snippet.schema';

export class CreateSnippetDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(200, { message: 'Title must be less than 200 characters' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  @MaxLength(5000, { message: 'Content must be less than 5000 characters' })
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsEnum(SnippetType, { message: 'Type must be one of: link, note, command' })
  @IsNotEmpty({ message: 'Type is required' })
  type: SnippetType;
}

