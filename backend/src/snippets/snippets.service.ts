import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Snippet, SnippetDocument } from './schemas/snippet.schema';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { QuerySnippetDto } from './dto/query-snippet.dto';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name) private snippetModel: Model<SnippetDocument>,
  ) {}

  async create(createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    const snippet = new this.snippetModel(createSnippetDto);
    return snippet.save();
  }

  async findAll(queryDto: QuerySnippetDto) {
    const { q, tag, page = 1, limit = 10 } = queryDto;
    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};

    // Text search
    if (q) {
      query.$text = { $search: q };
    }

    // Tag filter
    if (tag) {
      query.tags = tag;
    }

    const [snippets, total] = await Promise.all([
      this.snippetModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.snippetModel.countDocuments(query).exec(),
    ]);

    return {
      data: snippets,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Snippet> {
    const snippet = await this.snippetModel.findById(id).exec();
    if (!snippet) {
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    }
    return snippet;
  }

  async update(id: string, updateSnippetDto: UpdateSnippetDto): Promise<Snippet> {
    const snippet = await this.snippetModel
      .findByIdAndUpdate(id, updateSnippetDto, { new: true })
      .exec();

    if (!snippet) {
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    }

    return snippet;
  }

  async remove(id: string): Promise<void> {
    const result = await this.snippetModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    }
  }

  async getAllTags(): Promise<string[]> {
    const tags = await this.snippetModel.distinct('tags').exec();
    return tags.sort();
  }
}

