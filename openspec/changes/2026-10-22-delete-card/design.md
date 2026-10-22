# Design: Удаление карточки

## Архитектура
Удаление карточки реализовано через передачу функции onDelete от BoardPage через TaskColumn к TaskCard.

## Компоненты

### BoardPage
- Содержит функцию deleteCard(id: number)
- Делает DELETE-запрос через axios
- Вызывает queryClient.invalidateQueries() для обновления кэша
- Передаёт onDelete в TaskColumn

### TaskColumn
- Принимает пропс onDelete: (id: number) => void
- Передаёт onDelete в каждую карточку TaskCard

### TaskCard
- Принимает пропс onDelete: (id: number) => void
- Отображает кнопку "Удалить"
- При клике вызывает window.confirm()
- Если подтверждено — вызывает onDelete(task.id)

## API
- DELETE https://jsonplaceholder.typicode.com/todos/${id}
- Возвращает пустой объект при успехе

## Состояние
- Кэш React Query с ключом ['tasks'] инвалидируется после удаления
- Список карточек перезагружается автоматически

