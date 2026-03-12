# ⚡ QUICK DEPLOY GUIDE - VERCEL + RENDER

## 🚀 VERCEL (Frontend) - 5 минут

### 1. На текущем экране:
```
✅ Выбрать: frontend
✅ Continue
```

### 2. Environment Variables:
```
Key: NEXT_PUBLIC_API_URL
Value: http://localhost:3001
```

### 3. Deploy → копировать URL
```
Пример: https://arctic-web-xxx.vercel.app
```

---

## 🚀 RENDER (Backend) - 10 минут

### 1. Регистрация:
```
https://render.com → Sign in with GitHub
```

### 2. Создать Web Service:
```
New + → Web Service → Connect Arctic-web
```

### 3. Настройки:
```
Name: arctic-web-backend
Region: Frankfurt
Root Directory: backend ⚠️ ВАЖНО!
Build Command: npm install && npm run build
Start Command: npm run start:prod
Instance Type: Free
```

### 4. Environment Variables (3 штуки):
```
MONGODB_URI=mongodb+srv://venternevertony_db_user:Y9ZHHIGuH8ZwqId8@cluster0.a3cszy7.mongodb.net/snippet-vault?retryWrites=true&w=majority

PORT=3001

FRONTEND_URL=https://ваш-URL-с-vercel.vercel.app
```

### 5. Deploy → копировать URL
```
Пример: https://arctic-web-backend.onrender.com
```

---

## 🔗 СВЯЗЫВАЕМ - 3 минуты

### 1. Обновить Vercel:
```
Settings → Environment Variables → Edit NEXT_PUBLIC_API_URL
Новое значение: https://arctic-web-backend.onrender.com
Save → Deployments → Redeploy
```

### 2. Обновить Render:
```
Environment → Edit FRONTEND_URL
Новое значение: https://ваш-URL.vercel.app
Save (auto redeploy)
```

---

## ✅ ПРОВЕРКА

### Тест Backend:
```
https://arctic-web-backend.onrender.com/snippets
```
Ожидается: JSON с пустым массивом

### Тест Frontend:
```
https://ваш-URL.vercel.app/snippets
```
Создать сниппет → должен появиться в списке

---

## 🐛 ЕСЛИ НЕ РАБОТАЕТ

### MongoDB error:
```
Atlas → Network Access → Add IP: 0.0.0.0/0
```

### CORS error:
```
Проверить FRONTEND_URL на Render
Проверить NEXT_PUBLIC_API_URL на Vercel
Redeploy на обеих платформах
```

### Render медленный:
```
Это нормально! Free tier засыпает через 15 минут.
Первый запрос: 30-60 секунд.
```

---

## 📝 ИТОГО:

```
Frontend: Vercel (бесплатно)
Backend: Render (бесплатно) 
Database: MongoDB Atlas (бесплатно)

TOTAL: $0/месяц
```

✅ Готово! Добавь ссылки в README!

---

**Полная инструкция**: VERCEL-RENDER-DEPLOY.md

