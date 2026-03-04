# MyAniBook

**MyAniBook** — веб-приложение для ведения личного списка просмотренных аниме. Поддерживает регистрацию, авторизацию и управление профилем пользователя.

## Demo

- Frontend: [myanibook.vercel.app](https://myanibook.vercel.app/)
- Backend API (Swagger): [myanibook-api.onrender.com/api/docs](https://myanibook-api.onrender.com/api/docs)

> Бэкенд размещён на бесплатном тарифе Render — первый запрос может занять до 30 секунд (cold start).
> 
> Для корректной работы приложения может потребоваться VPN.

## Стек технологий

**Frontend**
- TypeScript
- React 18
- Redux Toolkit
- React Router v6
- Styled Components

**Backend** (отдельный репозиторий)
- NestJS
- PostgreSQL + Sequelize
- JWT авторизация
- Swagger документация
- Docker

## Возможности

- Поиск и просмотр информации об аниме через [Kitsu.io API](https://kitsu.io)
- Фильтрация по жанрам и категориям
- Добавление аниме в личный список просмотренных
- Регистрация, вход, управление профилем и аватаром
- Адаптивный дизайн (desktop / mobile)

## История изменений

- Проведён рефакторинг кодовой базы: улучшена структура компонентов, оптимизированы запросы к API, исправлен адаптивный дизайн для планшетов и мобильных устройств
- Сборщик проекта перенесён с Create React App на Vite
- Бэкенд перенесён с adaptable.app на Render
