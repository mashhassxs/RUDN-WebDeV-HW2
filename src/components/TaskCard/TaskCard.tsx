import { Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Task } from '../../types'

interface Props {
  task: Task
}

export default function TaskCard({ task }: Props) {
  const navigate = useNavigate()

  return (
    <Card sx={{ mb: 1, cursor: 'pointer' }}>
      <CardContent>
        <Typography
          variant="subtitle2"
          color="primary"
          onClick={() => navigate(`/task/${task.id}`)}
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          #{task.id}
        </Typography>
        <Typography variant="body2">{task.title}</Typography>
      </CardContent>
    </Card>
  )
}