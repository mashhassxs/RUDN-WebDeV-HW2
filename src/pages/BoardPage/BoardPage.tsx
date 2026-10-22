import { useQuery, useQueryClient } from '@tanstack/react-query'
import { BoardHeader } from '../../components/BoardHeader/BoardHeader'
import { BoardColumn } from '../../components/BoardColumn/BoardColumn'
import { fetchCards, deleteCard as deleteCardApi } from '../../api/cards'
import type { Card } from '../../types/card'

export default function BoardPage() {
  const queryClient = useQueryClient()

  const { data: cards = [], isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
  })

  const deleteCard = async (id: string) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить карточку?')
    if (!confirmed) return

    await deleteCardApi(id)
    queryClient.invalidateQueries({ queryKey: ['cards'] })
  }

  if (isLoading) return <div>Загрузка...</div>

  const todoCards = cards.filter((c) => !c.isDone && !c.isUrgent)
  const urgentCards = cards.filter((c) => !c.isDone && c.isUrgent)
  const doneCards = cards.filter((c) => c.isDone)

  return (
    <div>
      <BoardHeader />
      <div style={{ display: 'flex', gap: 20, padding: 20 }}>
        <BoardColumn title="К выполнению" cards={todoCards} onDelete={deleteCard} />
        <BoardColumn title="Срочные" cards={urgentCards} onDelete={deleteCard} />
        <BoardColumn title="Выполнено" cards={doneCards} onDelete={deleteCard} />
      </div>
    </div>
  )
}
