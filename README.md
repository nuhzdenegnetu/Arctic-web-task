# Mini Snippet Vault

Сервис для сохранения полезных фрагментов кода (ссылки/заметки/команды) с тегами и поиском.

## 🚀 Технологический стек

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: NestJS, TypeScript
- **Database**: MongoDB с Mongoose
- **Validation**: class-validator, class-transformer

## 📋 Функциональность

- ✅ CRUD операции для сниппетов
- ✅ Три типа сниппетов: Link, Note, Command
- ✅ Организация с помощью тегов и фильтрация
- ✅ Полнотекстовый поиск по title и content
- ✅ Пагинация
- ✅ Responsive UI с Tailwind CSS
- ✅ Валидация форм с сообщениями об ошибках
- ✅ Loading и error состояния

## 🛠️ Требования

- Node.js 18+ и npm
- MongoDB (локальная установка или MongoDB Atlas)

## 📦 Установка и запуск

### 1. Клонировать репозиторий

```bash
git clone https://github.com/nuhzdenegnetu/Arctic-web-task.git
cd Arctic-web
```

### 2. Настройка Backend

```bash
cd backend
npm install
```

Создайте файл `.env` в папке `backend` (см. `.env.example`):

```env
# Для локальной MongoDB
MONGODB_URI=mongodb://localhost:27017/snippet-vault

# Или для MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/snippet-vault?retryWrites=true&w=majority

PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3. Настройка Frontend

```bash
cd ../frontend
npm install
```

Создайте файл `.env` в папке `frontend` (см. `.env.example`):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🚀 Запуск локально

### Режим разработки

**Терминал 1 - Backend:**
```bash
cd backend
npm run start:dev
```

Сервер запустится на http://localhost:3001

**Терминал 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Приложение будет доступно на http://localhost:3000

### Production режим

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## 📡 API Endpoints

### Базовый URL: `http://localhost:3001`

| Метод | Endpoint | Описание | Query параметры |
|-------|----------|----------|-----------------|
| GET | `/snippets` | Получить все сниппеты | `page`, `limit`, `q`, `tag` |
| GET | `/snippets/:id` | Получить сниппет по ID | - |
| POST | `/snippets` | Создать новый сниппет | - |
| PUT | `/snippets/:id` | Обновить сниппет | - |
| DELETE | `/snippets/:id` | Удалить сниппет | - |
| GET | `/snippets/tags` | Получить все уникальные теги | - |

### Примеры запросов

**Создать сниппет:**
```bash
curl -X POST http://localhost:3001/snippets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Git Commit",
    "content": "git commit -m \"message\"",
    "tags": ["git", "terminal"],
    "type": "command"
  }'
```

**Получить список с пагинацией:**
```bash
curl "http://localhost:3001/snippets?page=1&limit=10"
```

**Поиск по тексту:**
```bash
curl "http://localhost:3001/snippets?q=git"
```

**Фильтр по тегу:**
```bash
curl "http://localhost:3001/snippets?tag=javascript"
```

**Комбинированный запрос:**
```bash
curl "http://localhost:3001/snippets?q=react&tag=frontend&page=1&limit=5"
```

**Получить сниппет по ID:**
```bash
curl http://localhost:3001/snippets/65a1b2c3d4e5f6g7h8i9j0k1
```

**Обновить сниппет:**
```bash
curl -X PUT http://localhost:3001/snippets/65a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content"
  }'
```

**Удалить сниппет:**
```bash
curl -X DELETE http://localhost:3001/snippets/65a1b2c3d4e5f6g7h8i9j0k1
```

## 📁 Структура проекта

```
Arctic-web/
├── backend/
│   ├── src/
│   │   ├── snippets/
│   │   │   ├── dto/
│   │   │   │   ├── create-snippet.dto.ts
│   │   │   │   ├── update-snippet.dto.ts
│   │   │   │   └── query-snippet.dto.ts
│   │   │   ├── schemas/
│   │   │   │   └── snippet.schema.ts
│   │   │   ├── snippets.controller.ts
│   │   │   ├── snippets.service.ts
│   │   │   └── snippets.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── snippets/
│   │   │   │   ├── page.tsx (список)
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx (детали)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── SnippetCard.tsx
│   │   │   ├── SnippetForm.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   ├── lib/
│   │   │   └── api.ts
│   │   └── types/
│   │       └── snippet.ts
│   ├── .env.example
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🎯 Схема Snippet

```typescript
{
  title: string;        // Required, текстовый индекс
  content: string;      // Required, текстовый индекс
  tags: string[];       // Массив тегов, индексировано
  type: 'link' | 'note' | 'command';  // Required, enum
  createdAt: Date;      // Автоматически
  updatedAt: Date;      // Автоматически
}
```

## 🔍 Реализованные требования

### Backend (NestJS)
- ✅ CRUD API для Snippet
- ✅ Валидация DTO через class-validator
- ✅ Обработка ошибок (400/404 статусы)
- ✅ Пагинация (page/limit)
- ✅ Поиск по title/content через query-параметр `q`
- ✅ Фильтр по тегу через параметр `tag`
- ✅ Чистая структура Module/Controller/Service

### Database (MongoDB)
- ✅ Схема через Mongoose
- ✅ Text-индекс по title и content для быстрого поиска
- ✅ Индекс по tags для фильтрации
- ✅ Автоматическое сохранение createdAt/updatedAt

### Frontend (Next.js)
- ✅ Страница списка со створенням нового Snippet через форму
- ✅ Страница деталей Snippet
- ✅ Возможность редактирования и удаления
- ✅ Поиск и фильтр по тегу в UI
- ✅ Валидация формы (required + сообщения)
- ✅ Интеграция с API через fetch
- ✅ Состояния loading/empty/error
- ✅ Чистый интерфейс с Tailwind CSS
- ✅ Responsive design

## 📝 Переменные окружения

### Backend (.env.example)
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/snippet-vault
# или MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/snippet-vault

# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.example)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🧪 Как проверить работу

1. **Запустите Backend и Frontend** (см. раздел "Запуск локально")
2. **Откройте** http://localhost:3000
3. **Создайте сниппет** через кнопку "Create New Snippet"
4. **Используйте поиск** для поиска по названию/содержимому
5. **Фильтруйте по тегам** кликая на теги
6. **Откройте детали** кликнув на карточку
7. **Редактируйте и удаляйте** сниппеты

## 🌐 Live Demo

- **Frontend**: https://arctic-web-task.vercel.app/ (обновите после деплоя)
- **Backend API**: https://arctic-web-task.onrender.com

⚠️ **Примечание**: Backend на Render может "засыпать" после 15 минут неактивности. Первый запрос после сна займет 30-60 секунд.

