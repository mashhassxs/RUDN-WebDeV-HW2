import { Box, Typography, Paper } from '@mui/material'
import TaskCard from '../TaskCard/TaskCard'
import type { Card } from '../../types/card'

interface Props {
  title: string
  cards: Card[]
  onDelete: (id: string) => void
}

export default function TaskColumn({ title, cards, onDelete }: Props) {
  return (
    <Paper sx={{ p: 2, minWidth: 300 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box>
        {cards.map((card) => (
          <TaskCard key={card.id} card={card} onDelete={onDelete} />
        ))}
      </Box>
    </Paper>
  )
}
