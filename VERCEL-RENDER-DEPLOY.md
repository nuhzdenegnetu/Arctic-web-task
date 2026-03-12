# 🚀 ПОШАГОВЫЙ ГАЙД: ДЕПЛОЙ НА VERCEL + RENDER

> **Цель**: Задеплоить Frontend на Vercel и Backend на Render (обе платформы бесплатны и не требуют кредитную карту)

---

## 📋 ЧТО ВАМ ПОНАДОБИТСЯ

- ✅ GitHub репозиторий с проектом Arctic-web
- ✅ Аккаунт GitHub (для регистрации)
- ✅ 30 минут времени

---

## ЧАСТЬ 1: ДЕПЛОЙ FRONTEND НА VERCEL (10 минут)

### Шаг 1: Выбор директории (ВЫ СЕЙЧАС ЗДЕСЬ)

На текущем экране Vercel:

1. ✅ **Кликните на radio button рядом с `frontend`**
2. ✅ **Нажмите кнопку "Continue"**

![image](https://github.com/user-attachments/assets/select-frontend.png)

---

### Шаг 2: Настройка проекта

Vercel автоматически определит Next.js и покажет:

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Root Directory: frontend
```

✅ **Все правильно! НЕ меняйте эти настройки.**

---

### Шаг 3: Environment Variables (ВАЖНО!)

Прокрутите вниз до секции **"Environment Variables"**

#### Добавьте переменную:

1. Найдите поле **"Key"** (или "Name")
2. Введите: `NEXT_PUBLIC_API_URL`
3. В поле **"Value"** введите: `http://localhost:3001` (временно)
4. В **"Environment"** выберите: **All** (Production, Preview, Development)
5. Нажмите **"Add"**

```
Key: NEXT_PUBLIC_API_URL
Value: http://localhost:3001
Environment: All
```

⚠️ **Примечание**: Мы обновим этот URL после деплоя backend

---

### Шаг 4: Deploy

1. Прокрутите вниз
2. Нажмите большую синюю кнопку **"Deploy"**
3. Ждите 2-3 минуты (наблюдайте за логами)

Вы увидите:
```
Building...
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
```

---

### Шаг 5: Получение URL

После успешного деплоя:

1. ✅ Вы увидите страницу с конфетти 🎉
2. ✅ В центре будет ваш URL: `https://arctic-web-xxx.vercel.app`
3. ✅ **СКОПИРУЙТЕ ЭТОТ URL** - он понадобится для backend!

Пример: `https://arctic-web-gi8k9p2j1.vercel.app`

---

## ЧАСТЬ 2: ДЕПЛОЙ BACKEND НА RENDER (15 минут)

### Шаг 1: Регистрация на Render

1. Откройте новую вкладку: https://render.com
2. Нажмите **"Get Started"** (или "Sign Up")
3. Выберите **"Sign in with GitHub"**
4. Разрешите Render доступ к GitHub
5. Подтвердите email (если попросят)

---

### Шаг 2: Создание Web Service

1. В дашборде Render нажмите синюю кнопку **"New +"**
2. Выберите **"Web Service"**

![image](https://github.com/user-attachments/assets/new-web-service.png)

---

### Шаг 3: Подключение репозитория

1. Выберите **"Build and deploy from a Git repository"**
2. Нажмите **"Next"**
3. Найдите в списке **"Arctic-web"** (или ваше название репозитория)
4. Нажмите **"Connect"**

Если не видите репозиторий:
- Нажмите "Configure account" → выберите нужные репозитории

---

### Шаг 4: Настройка проекта

Заполните поля:

#### Basic Settings:

**Name**: `arctic-web-backend`
(или любое имя, без пробелов)

**Region**: `Frankfurt (EU Central)`
(ближайший к Украине)

**Branch**: `main`
(или ваша основная ветка: master, main)

**Root Directory**: `backend` ⚠️ **ОЧЕНЬ ВАЖНО!**

**Runtime**: `Node`

**Build Command**:
```bash
npm install && npm run build
```

**Start Command**:
```bash
npm run start:prod
```

---

#### Instance Type:

Выберите **"Free"** (должен быть выбран по умолчанию)

✅ Характеристики Free tier:
- 512 MB RAM
- Засыпает через 15 минут неактивности
- 750 часов в месяц

---

### Шаг 5: Environment Variables (КРИТИЧНО!)

Прокрутите вниз до секции **"Environment Variables"**

#### Добавьте ТРИ переменные:

**1. MONGODB_URI**

Нажмите **"Add Environment Variable"**

Key: `MONGODB_URI`

Value: 
```
mongodb+srv://venternevertony_db_user:Y9ZHHIGuH8ZwqId8@cluster0.a3cszy7.mongodb.net/snippet-vault?retryWrites=true&w=majority
```

⚠️ **Важно**: Скопируйте полностью из вашего `.env` файла!

---

**2. PORT**

Key: `PORT`

Value: `3001`

---

**3. FRONTEND_URL**

Key: `FRONTEND_URL`

Value: `https://ваш-проект.vercel.app`

⚠️ **Замените на реальный URL** который вы скопировали в Шаге 5 Части 1!

Пример: `https://arctic-web-gi8k9p2j1.vercel.app`

---

### Итого должно быть 3 переменные:

```
MONGODB_URI=mongodb+srv://venternevertony_db_user:Y9ZHHIGuH8ZwqId8@...
PORT=3001
FRONTEND_URL=https://arctic-web-gi8k9p2j1.vercel.app
```

---

### Шаг 6: Deploy

1. Прокрутите вниз
2. Нажмите большую синюю кнопку **"Create Web Service"**
3. Дождитесь завершения деплоя (первый раз 5-7 минут)

Вы увидите логи:
```
==> Cloning from https://github.com/...
==> Running build command 'npm install && npm run build'
==> npm install
==> npm run build
==> Starting service with 'npm run start:prod'
==> Your service is live 🎉
```

---

### Шаг 7: Получение URL backend

После успешного деплоя:

1. Вверху страницы вы увидите URL:
   
   `https://arctic-web-backend.onrender.com`

2. ✅ **СКОПИРУЙТЕ ЭТОТ URL**

3. Проверьте работу: откройте в браузере
   
   `https://arctic-web-backend.onrender.com/snippets`

4. Должны увидеть JSON:
   ```json
   {
     "data": [],
     "meta": {
       "total": 0,
       "page": 1,
       "limit": 10,
       "totalPages": 0
     }
   }
   ```

⚠️ **Первый запрос может занять 30-60 секунд** (сервер просыпается)

---

## ЧАСТЬ 3: СВЯЗЫВАЕМ FRONTEND И BACKEND (5 минут)

### Шаг 1: Обновить переменную на Vercel

1. Вернитесь на Vercel: https://vercel.com/dashboard
2. Найдите ваш проект **"Arctic-web"**
3. Кликните на него
4. Перейдите во вкладку **"Settings"** (вверху)
5. В левом меню выберите **"Environment Variables"**
6. Найдите переменную `NEXT_PUBLIC_API_URL`
7. Нажмите на иконку **редактирования** (карандаш справа)
8. Измените значение на URL с Render:
   
   `https://arctic-web-backend.onrender.com`
   
   (без слеша в конце!)

9. Нажмите **"Save"**

---

### Шаг 2: Redeploy на Vercel

1. Перейдите во вкладку **"Deployments"** (вверху)
2. Найдите последний деплой (самый верхний)
3. Нажмите на три точки **"..."** справа
4. Выберите **"Redeploy"**
5. Выберите **"Use existing Build Cache"** (быстрее)
6. Нажмите **"Redeploy"**
7. Дождитесь завершения (1-2 минуты)

---

### Шаг 3: Обновить переменную на Render

1. Вернитесь на Render: https://render.com/dashboard
2. Откройте ваш сервис **"arctic-web-backend"**
3. В левом меню выберите **"Environment"**
4. Найдите переменную `FRONTEND_URL`
5. Нажмите **"Edit"**
6. Убедитесь что URL правильный: `https://ваш-проект.vercel.app`
7. Если нужно - исправьте
8. Нажмите **"Save Changes"**
9. Render автоматически сделает redeploy (2-3 минуты)

---

## ✅ ПРОВЕРКА РАБОТОСПОСОБНОСТИ

### Тест 1: Проверка Backend API

Откройте в браузере:
```
https://arctic-web-backend.onrender.com/snippets
```

✅ Ожидаемый результат: JSON с пустым массивом
```json
{
  "data": [],
  "meta": {
    "total": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 0
  }
}
```

⚠️ Если первый запрос долгий (30-60 сек) - это нормально, сервер просыпается.

---

### Тест 2: Проверка Frontend

Откройте:
```
https://ваш-проект.vercel.app
```

✅ Ожидаемый результат: Главная страница с кнопкой "View Snippets"

---

### Тест 3: Проверка интеграции

1. Откройте страницу сниппетов:
   ```
   https://ваш-проект.vercel.app/snippets
   ```

2. Нажмите кнопку **"Create New Snippet"**

3. Заполните форму:
   - **Title**: "Test Snippet"
   - **Content**: "This is a test"
   - **Tags**: "test"
   - **Type**: "Note"

4. Нажмите **"Create"**

5. ✅ **Если сниппет появился в списке - все работает отлично! 🎉**

---

### Тест 4: Проверка поиска

1. Создайте несколько сниппетов
2. Используйте поиск вверху страницы
3. Кликните на теги для фильтрации
4. Проверьте пагинацию (если > 9 сниппетов)

---

## 🐛 TROUBLESHOOTING (Решение проблем)

### Проблема 1: Frontend не подключается к Backend

**Симптомы**: Ошибка "Failed to fetch snippets" или CORS error

**Решение**:
1. Проверьте что `NEXT_PUBLIC_API_URL` на Vercel правильный
2. Проверьте что `FRONTEND_URL` на Render правильный
3. Оба URL должны быть БЕЗ слеша в конце
4. Сделайте Redeploy на обеих платформах

---

### Проблема 2: Backend не запускается на Render

**Симптомы**: "Deploy failed" или "Service unhealthy"

**Решение**:
1. Проверьте логи на Render (вкладка "Logs")
2. Убедитесь что **Root Directory** = `backend`
3. Проверьте что все Environment Variables добавлены
4. Проверьте MongoDB Atlas whitelist (см. ниже)

---

### Проблема 3: MongoDB connection error

**Симптомы**: "MongooseServerSelectionError" в логах Render

**Решение**:
1. Откройте MongoDB Atlas: https://cloud.mongodb.com
2. Перейдите в **Network Access**
3. Нажмите **"Add IP Address"**
4. Выберите **"Allow Access from Anywhere"**
5. IP Address: `0.0.0.0/0`
6. Нажмите **"Confirm"**
7. Подождите 1-2 минуты
8. Redeploy на Render

---

### Проблема 4: Render сервис долго отвечает

**Это нормально!** Free tier на Render засыпает через 15 минут неактивности.

**Решения**:
- Принять как есть (для тестового задания это OK)
- Использовать Railway вместо Render (требует карту)
- Настроить cron job для пинга каждые 10 минут

---

### Проблема 5: Vercel показывает старую версию

**Решение**:
1. Settings → Environment Variables → измените переменную
2. Deployments → Redeploy (обязательно!)
3. Очистите кеш браузера (Ctrl + F5)

---

## 📝 ИТОГОВЫЕ URL-ы ДЛЯ ДОБАВЛЕНИЯ В README

После успешного деплоя добавьте эти ссылки в README.md:

```markdown
## 🌐 Live Demo

- **Frontend**: https://ваш-проект.vercel.app
- **Backend API**: https://arctic-web-backend.onrender.com
- **Database**: MongoDB Atlas

### API Endpoints:
- GET https://arctic-web-backend.onrender.com/snippets
- GET https://arctic-web-backend.onrender.com/snippets/:id
- POST https://arctic-web-backend.onrender.com/snippets
- PUT https://arctic-web-backend.onrender.com/snippets/:id
- DELETE https://arctic-web-backend.onrender.com/snippets/:id
```

---

## 🎯 ЧЕКЛИСТ ПЕРЕД СДАЧЕЙ

- [ ] ✅ Frontend задеплоен на Vercel
- [ ] ✅ Backend задеплоен на Render
- [ ] ✅ MongoDB Atlas IP whitelist: 0.0.0.0/0
- [ ] ✅ Environment Variables настроены на обеих платформах
- [ ] ✅ FRONTEND_URL на Render указывает на Vercel
- [ ] ✅ NEXT_PUBLIC_API_URL на Vercel указывает на Render
- [ ] ✅ Протестировано создание сниппета
- [ ] ✅ Протестирован поиск
- [ ] ✅ Протестированы фильтры
- [ ] ✅ Добавлены live demo URL в README
- [ ] ✅ Проверено что все работает через live demo

---

## 📊 ФИНАЛЬНАЯ КОНФИГУРАЦИЯ

### Vercel (Frontend)

```
Project: arctic-web
Root Directory: frontend
Framework: Next.js
Build Command: npm run build
Output Directory: .next

Environment Variables:
NEXT_PUBLIC_API_URL=https://arctic-web-backend.onrender.com
```

### Render (Backend)

```
Name: arctic-web-backend
Region: Frankfurt
Root Directory: backend
Build Command: npm install && npm run build
Start Command: npm run start:prod
Instance Type: Free

Environment Variables:
MONGODB_URI=mongodb+srv://venternevertony_db_user:...
PORT=3001
FRONTEND_URL=https://ваш-проект.vercel.app
```

### MongoDB Atlas

```
Cluster: cluster0.a3cszy7.mongodb.net
Database: snippet-vault
Network Access: 0.0.0.0/0 (Allow all)
```

---

## 🎓 ДОПОЛНИТЕЛЬНЫЕ УЛУЧШЕНИЯ (опционально)

### 1. Custom Domain на Vercel
1. Settings → Domains → Add Domain
2. Добавьте свой домен (если есть)
3. Обновите DNS записи

### 2. Мониторинг на Render
1. Dashboard → Notifications
2. Настройте email уведомления о падении сервиса

### 3. Автоматический деплой
Уже настроен! Любой push в main ветку:
- Автоматически деплоит frontend на Vercel
- Автоматически деплоит backend на Render

---

## ✅ ГОТОВО!

Ваше приложение полностью задеплоено и доступно онлайн! 🚀

**Frontend**: https://ваш-проект.vercel.app
**Backend**: https://arctic-web-backend.onrender.com

Теперь можете добавить эти ссылки в тестовое задание!

---

## 📞 ЕСЛИ ЧТО-ТО ПОШЛО НЕ ТАК

1. Проверьте логи на Render (Logs вкладка)
2. Проверьте логи на Vercel (Deployments → кликните на деплой → Logs)
3. Проверьте MongoDB Atlas Network Access
4. Проверьте что все Environment Variables правильные
5. Попробуйте Redeploy на обеих платформах

Если проблема остается - посмотрите раздел Troubleshooting выше.

---

**Удачи с тестовым заданием! 💪**

