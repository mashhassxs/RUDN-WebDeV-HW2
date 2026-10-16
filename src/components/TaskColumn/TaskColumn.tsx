import { Box, Typography, Paper } from '@mui/material'
import type { Task } from '../../types'
import TaskCard from '../TaskCard/TaskCard'
import { useBoardFiltersStore } from '../../store/useBoardFiltersStore'

const statusLabels = ['К выполнению', 'В работе', 'Выполнено']

interface Props {
  tasks: Task[]
  status: number
}

export default function TaskColumn({ tasks, status }: Props) {
  const hideDone = useBoardFiltersStore((state) => state.hideDone)
  const filtered = tasks.filter((t) => t.status === status && (!hideDone || t.status !== 2))

  return (
    <Paper sx={{ p: 2, minHeight: 400 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {statusLabels[status]}
      </Typography>
      {filtered.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Paper>
  )
}
