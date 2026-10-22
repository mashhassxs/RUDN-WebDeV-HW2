import { Box, Typography, Paper } from '@mui/material'
import type { Task } from '../../types'
import TaskCard from '../TaskCard/TaskCard'

const statusLabels = ['К выполнению', 'В работе', 'Выполнено']

interface Props {
  tasks: Task[]
  status: number
  onDelete: (id: number) => void
}

export default function TaskColumn({ tasks, status, onDelete }: Props) {
  const filtered = tasks.filter((t) => t.status === status)

  return (
    <Paper sx={{ p: 2, minHeight: 400 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {statusLabels[status]}
      </Typography>
      <Box>
        {filtered.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </Box>
    </Paper>
  )
}
