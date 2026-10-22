<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# Канбан-доска — проект курса WebDev Advanced

Сквозной учебный проект курса: канбан-доска, которую ты дорабатываешь от семинара к семинару. Сейчас написан только клиент на React; по ходу курса рядом с ним появятся сервер, база данных и авторизация.

Репозиторий разделён на две независимые части — `client/` и `server/`. Это не два куска одного приложения, а два самостоятельных проекта, каждый со своим `package.json` и своими зависимостями; общаются они между собой только по HTTP. Папка `server/` пока пуста — её содержимое появится в теме 3. В корне лежит только общее для всего репозитория: документация, спеки OpenSpec и скиллы для AI-агента.

```
client/     # фронтенд на React (написан, дорабатывается с темы 1)
server/     # бэкенд на Express (появится в теме 3)
docs/       # лекции и задания семинаров
openspec/   # спеки и изменения, с которыми работает AI-агент (тема 2)
```

## Стек

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
- CSS Modules — стили компонентов
- [TanStack Query (React Query)](https://tanstack.com/query/latest) — серверное состояние
- [Zustand](https://zustand.docs.pmnd.rs/) — клиентское состояние
- [json-server](https://github.com/typicode/json-server) — мок-сервер (пока не появится настоящий backend)

## Запуск

Все команды клиента выполняются **из папки `client/`** — там лежит его `package.json`:

```bash
cd client          # все команды ниже — отсюда
npm install        # один раз после клонирования
npm run dev        # dev-сервер Vite → http://localhost:5173
npm run server     # мок-сервер API → http://localhost:3001
```

Для заданий, где нужен сервер, запусти `npm run dev` и `npm run server` в двух терминалах (оба — из `client/`). Запросы клиента к `/api/*` автоматически проксируются на мок-сервер: `fetch("/api/cards")` вернёт содержимое коллекции `cards` из [db.json](client/db.json).

Прочие команды:

```bash
npm run build      # сборка + проверка типов (должна проходить перед сдачей!)
npm run lint       # ESLint
```

## Структура

```
client/
  src/
    main.tsx                # точка входа, здесь подключён QueryClientProvider
    App.tsx                 # корневой компонент: шапка + доска
    index.css               # глобальные стили и CSS-переменные темы
    types/
      card.ts               # тип Card
    api/
      cards.ts              # готовые функции запросов к серверу
    components/
      BoardHeader/          # шапка страницы
      BoardColumn/          # колонка с карточками
      BoardCard/            # карточка задачи
      NewCardForm/          # форма добавления карточки
  db.json                   # данные мок-сервера
  package.json              # зависимости и команды клиента
server/                     # пока пусто — наполним в теме 3
docs/                       # лекции и задания семинаров
openspec/
  config.yaml               # настройки OpenSpec: схема и язык документов
  changes/                  # изменения в работе (появятся по ходу заданий)
  specs/                    # спеки продукта (наполняются при архивации изменений)
.gigacode/skills/           # скиллы OpenSpec для агента GigaCode
```

Каждый компонент лежит в своей папке вместе со своим CSS-модулем (`*.module.css`).

## Спеки и AI-агент: OpenSpec + GigaCode

Работа с агентом в курсе идёт через [OpenSpec](https://github.com/Fission-AI/OpenSpec) — инструмент, который ведёт задачу по цепочке документов (`proposal.md` → спека → `design.md` → `tasks.md`) и хранит их в папке `openspec/`. Сам агент — расширение **GigaCode** для VS Code; в `.gigacode/skills/` лежат скиллы OpenSpec, поэтому агент знает эту цепочку сразу после клонирования репозитория. Подробно про подход — в [лекции темы 2](docs/2-AI-Agents/LECTURE-2.md), про установку — в [задании семинара](docs/2-AI-Agents/SEMINAR-2.md).

Что нужно сделать один раз:

```bash
npm install -g @fission-ai/openspec@1.10.0   # утилита, команды которой вызывают скиллы
```

В `.gigacode/skills/` лежат восемь скиллов: семь `openspec-*`, сгенерированных самим OpenSpec, и курсовой `work-report` — он собирает отчёт о проделанной работе по истории коммитов и запускается только по прямой просьбе.

Дальше проси агента в чате GigaCode обычными словами («заведи изменение…», «реализуй шаг 1.1…», «собери отчёт о работе») — он сам подтянет нужный скилл. Команды `openspec …` набирает агент, а не ты: твой интерфейс к инструменту — просьбы в чате и файлы, которые после них появляются в `openspec/`. Список скиллов виден в настройках GigaCode; после первого клонирования репозиторий стоит переоткрыть в VS Code, чтобы расширение их подхватило.

Документы OpenSpec настроены писаться по-русски (`openspec/config.yaml`), а структурные заголовки и слова `SHALL`/`MUST` остаются английскими — так требует формат.

### Пересборка скиллов (сопровождение репозитория)

Студенту это не нужно: скиллы лежат в репозитории готовыми. Процедура нужна тому, кто ведёт репозиторий, — при обновлении версии OpenSpec, — или если ты работаешь другим агентом (Cursor, Claude Code), у которого своя папка для скиллов. OpenSpec про GigaCode пока не знает и умеет писать только в каталоги известных ему инструментов, поэтому файлы переносятся руками — формат у всех одинаковый:

```bash
openspec config profile          # выбрать набор скиллов: explore, new, continue,
                                 # update, apply, sync, archive
openspec init --tools agents --language Russian
```

Скиллы окажутся в `.agents/skills/`. Перенеси оттуда папки `openspec-*` в `.gigacode/skills/` (заменив старые), удали `.agents/` и перезапусти VS Code. Папку `work-report` не трогай: OpenSpec её не генерирует и при пересборке не восстановит.

## Как работать с проектом

- Установка, работа с Git без командной строки, сдача и приёмка заданий — [docs/COURSE-SETUP.md](docs/COURSE-SETUP.md);
- План курса по темам — [docs/COURSE-PLAN.md](docs/COURSE-PLAN.md);
- Лекции и задания семинаров — `docs/<N>-<Тема>/`.

Коротко о главном: `main` не трогаем, на каждое задание — своя ветка, коммиты мелкие и осмысленные, сдача оценочных заданий — через merge request в своей копии.
>>>>>>> upstream/main
