import { Box, Typography } from '@mui/material'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { Task } from '../../types'
import TaskColumn from '../../components/TaskColumn/TaskColumn'

const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')
  return data.slice(0, 20).map((item: any) => ({
    id: item.id,
    title: item.title,
    description: '',
    createdAt: new Date(),
    status: item.completed ? 2 : 0,
  }))
}

export default function BoardPage() {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })

  const queryClient = useQueryClient()

  const deleteCard = async (id: number) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить карточку?')
    if (!confirmed) return
    
    // Оптимистичное обновление — сразу удаляем из кэша
    queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) => {
      if (!oldTasks) return oldTasks
      return oldTasks.filter((task) => task.id !== id)
    })
    
    // Пытаемся отправить запрос на сервер
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    } catch (error) {
      console.log('Запрос на удаление отправлен (или фейковый API не ответил)')
    }
  }

  if (isLoading) return <Typography>Загрузка...</Typography>

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {[0, 1, 2].map((status) => (
        <Box key={status} sx={{ flex: 1 }}>
          <TaskColumn tasks={tasks} status={status} onDelete={deleteCard} />
        </Box>
      ))}
    </Box>
  )
}
