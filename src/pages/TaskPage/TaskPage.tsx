import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Box, Typography, Button, Stack } from '@mui/material'


const statusLabels = ['К выполнению', 'В работе', 'Выполнено']

export default function TaskPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const tasks = queryClient.getQueryData<Task[]>(['tasks']) ?? []
  const task = tasks.find((t) => t.id === Number(id))

  if (!task) return <Typography>Задача не найдена</Typography>

  const changeStatus = (newStatus: number) => {
    queryClient.setQueryData<Task[]>(['tasks'], (old) =>
      (old ?? []).map((t) => t.id === task.id ? { ...t, status: newStatus } : t)
    )
  }

  const deleteTask = () => {
    queryClient.setQueryData<Task[]>(['tasks'], (old) =>
      (old ?? []).filter((t) => t.id !== task.id)
    )
    navigate('/')
  }

  return (
    <Box>
      <Typography variant="h5">Задача #{task.id}</Typography>
      <Typography>Название: {task.title}</Typography>
      <Typography>Описание: {task.description || '—'}</Typography>
      <Typography>Дата создания: {task.createdAt.toString()}</Typography>
      <Typography>Статус: {statusLabels[task.status]}</Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        {[0, 1, 2].filter((s) => s !== task.status).map((s) => (
          <Button key={s} variant="outlined" onClick={() => changeStatus(s)}>
            {statusLabels[s]}
          </Button>
        ))}
        <Button variant="contained" color="error" onClick={deleteTask}>
          Удалить
        </Button>
      </Stack>
    </Box>
  )
}