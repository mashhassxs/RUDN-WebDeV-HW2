import { Box, Typography, Paper, Button } from '@mui/material'
import type { Task } from '../../types'

interface TaskCardProps {
  task: Task
  onDelete: (id: number) => void
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="body2" sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
        #{task.id}
      </Typography>
      <Typography variant="body2">{task.title}</Typography>
      <Button
        size="small"
        color="error"
        onClick={() => onDelete(task.id)}
        sx={{ mt: 1 }}
      >
        Удалить
      </Button>
    </Paper>
  )
}
