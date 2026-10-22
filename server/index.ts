import express from "express";

const app = express();

// Middleware для парсинга JSON — ДО роутов!
app.use(express.json());

const cards = [
  {
    "id": "1",
    "title": "sdf1ugdh5fjklhСпроектировать структуру доски",
    "isDone": true,
    "isUrgent": false
  },
  {
    "id": "2",
    "title": "Подключить доску к серверу",
    "isDone": false,
    "isUrgent": true
  },
  {
    "id": "3",
    "title": "Добавить фильтр выполненных карточек",
    "isDone": false,
    "isUrgent": false
  }
];

// GET — получить все карточки
app.get("/api/cards", (req, res) => {
  res.json(cards);
});

// DELETE — удалить карточку по ID из пути
app.delete("/api/cards/:id", (req, res) => {
  const { id } = req.params;
  const index = cards.findIndex((card) => card.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Карточка не найдена" });
  }
  
  cards.splice(index, 1);
  res.status(200).json({ message: "Карточка удалена", id });
});

// Обработчик неизвестных путей — возвращает JSON 404
app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

// Error-middleware с 4 параметрами — возвращает JSON 500
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

app.listen(3001, () => {
  console.log("Сервер запущен!");
});
