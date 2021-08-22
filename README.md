# Yalantis test repo for Nodejs School

Согласно тестовому заданию, был создан веб-сервер для чтения-записи информации о пользователе.

Также были выполнены задания со звездочкой:
 - использовался фреймфорк Nest.js, который из коробки поддерживает TypesSript
 - для валидации данных использовался встроенный в Nest.js ValidationPipe модуль
 - в качестве хранения данных использовалась mongo
## Requirments
- node v14.17+

## Installing / Getting started
  
```bash
npm start
```

## Configuration

Для доступа к переменным окружения использовался модуль ConfigModule, сам файл .env хранит в себе 3 переменные:
 - PORT
 - UPLOADS_PATH
 - MONGO_URI
## Api Reference
Всего было реализовано 4 роута:
 - GET /users
 - GET /users/:id
 - POST /users
 - DELETE /users 

## Database

Для хранения информации о пользователе использовалась mongodb, cloud решение, API_url которой хранится в файле .env.

Можете использовать уже имеющийся url, так как это тестовый аккаунт, либо свои API ключи.