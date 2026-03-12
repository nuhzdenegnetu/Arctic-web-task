# 🔧 РЕШЕНИЕ CORS ПРОБЛЕМ

## Проблема

```
Access to XMLHttpRequest at 'https://arctic-web-task.onrender.com/snippets' 
from origin 'https://arctic-web-task.vercel.app' 
has been blocked by CORS policy: 
The 'Access-Control-Allow-Origin' header has a value 
'https://arctic-web-task.vercel.app/' 
that is not equal to the supplied origin.
```

---

## Причина

В переменной окружения `FRONTEND_URL` на Render был **лишний слеш**:

❌ **Неправильно:**
```
FRONTEND_URL=https://arctic-web-task.vercel.app/
                                              ↑
                                         ЛИШНИЙ СЛЕШ
```

✅ **Правильно:**
```
FRONTEND_URL=https://arctic-web-task.vercel.app
                                              ↑
                                         БЕЗ СЛЕША
```

---

## Почему это критично?

### Код в backend/src/main.ts:

```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
});
```

### Что происходит:

1. **Frontend** делает запрос с origin: `https://arctic-web-task.vercel.app`
2. **Backend** отвечает с header: `Access-Control-Allow-Origin: https://arctic-web-task.vercel.app/`
3. **Браузер** видит что они НЕ совпадают (со слешем vs без слеша)
4. **Браузер** блокирует запрос

---

## Решение

### Вариант 1: Исправить Environment Variable (РЕКОМЕНДУЕТСЯ)

**На Render:**
1. Dashboard → Ваш сервис
2. Environment
3. Edit `FRONTEND_URL`
4. Убрать слеш в конце
5. Save Changes
6. Дождаться автоматического redeploy

---

### Вариант 2: Изменить код (альтернатива)

Если не можете изменить переменную, можно изменить код:

```typescript
// backend/src/main.ts
app.enableCors({
  origin: (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, ''),
  credentials: true,
});
```

Это автоматически убирает слеш в конце.

---

### Вариант 3: Разрешить все origins (НЕ РЕКОМЕНДУЕТСЯ для production)

```typescript
app.enableCors({
  origin: true, // Разрешает все origins
  credentials: true,
});
```

⚠️ **Небезопасно!** Используйте только для тестирования.

---

## Проверка после исправления

### 1. Проверьте что Render redeploy завершился

В Render → Events → должно быть "Deploy live"

### 2. Проверьте CORS headers

В браузере откройте DevTools (F12) → Network → выберите любой запрос к API:

**Response Headers должны содержать:**
```
Access-Control-Allow-Origin: https://arctic-web-task.vercel.app
                                                              ↑
                                                         БЕЗ СЛЕША!
```

### 3. Проверьте что ошибок нет

В Console не должно быть ошибок CORS.

---

## Другие частые CORS проблемы

### Проблема: OPTIONS preflight запросы

**Симптомы:**
```
Access to fetch has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check
```

**Решение:**
NestJS автоматически обрабатывает OPTIONS запросы при `app.enableCors()`.
Убедитесь что CORS включен ДО регистрации роутов.

---

### Проблема: Credentials

**Симптомы:**
```
The value of the 'Access-Control-Allow-Credentials' header in the response 
is '' which must be 'true' when the request's credentials mode is 'include'
```

**Решение:**
```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true, // ← Добавить эту строку
});
```

---

### Проблема: Wildcard origin с credentials

**Симптомы:**
```
The value of the 'Access-Control-Allow-Origin' header in the response 
must not be the wildcard '*' when the request's credentials mode is 'include'
```

**Решение:**
Нельзя использовать:
```typescript
origin: '*' // ← Не работает с credentials: true
```

Нужно:
```typescript
origin: 'https://ваш-frontend.com' // Конкретный origin
```

Или массив origins:
```typescript
origin: [
  'https://frontend1.com',
  'https://frontend2.com'
]
```

---

## Правильная конфигурация CORS для production

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS конфигурация
  const allowedOrigins = [
    process.env.FRONTEND_URL?.replace(/\/$/, ''), // Убираем слеш
    'http://localhost:3000', // Для локальной разработки
  ].filter(Boolean); // Убираем undefined

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Валидация
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Server running on port ${port}`);
}

bootstrap();
```

---

## Чеклист перед деплоем

- [ ] `FRONTEND_URL` без слеша в конце
- [ ] `CORS` включен в `main.ts`
- [ ] `credentials: true` если используются cookies
- [ ] `origin` - конкретный URL, не wildcard
- [ ] Протестировано в production окружении

---

## Debugging CORS

### 1. Проверьте request origin:

В DevTools → Network → Request Headers:
```
Origin: https://arctic-web-task.vercel.app
```

### 2. Проверьте response headers:

Response Headers:
```
Access-Control-Allow-Origin: https://arctic-web-task.vercel.app
Access-Control-Allow-Credentials: true
```

### 3. Проверьте что они совпадают

Origin запроса **ДОЛЖЕН** точно совпадать с Allow-Origin ответа:
- ✅ `https://example.com` === `https://example.com`
- ❌ `https://example.com` !== `https://example.com/`
- ❌ `http://example.com` !== `https://example.com`
- ❌ `https://example.com` !== `https://www.example.com`

---

## Полезные ссылки

- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [NestJS CORS](https://docs.nestjs.com/security/cors)
- [CORS Checker](https://www.test-cors.org/)

---

**Проблема решена!** ✅

