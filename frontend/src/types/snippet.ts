export enum SnippetType {
  LINK = 'link',
  NOTE = 'note',
  COMMAND = 'command',
}

export interface Snippet {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSnippetInput {
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
}

export type UpdateSnippetInput = Partial<CreateSnippetInput>;

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

