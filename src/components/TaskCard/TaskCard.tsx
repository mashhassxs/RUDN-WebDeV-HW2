import { Card, CardContent, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Card as CardType } from '../../types/card'

interface Props {
  card: CardType
  onDelete: (id: string) => void
}

export default function TaskCard({ card, onDelete }: Props) {
  const navigate = useNavigate()

  return (
    <Card sx={{ mb: 1, cursor: 'pointer' }} onClick={() => navigate(`/tasks/${card.id}`)}>
      <CardContent>
        <Typography variant="subtitle2">#{card.id}</Typography>
        <Typography variant="body2">{card.title}</Typography>
        <Button
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(card.id)
          }}
          sx={{ mt: 1 }}
        >
          Удалить
        </Button>
      </CardContent>
    </Card>
  )
}
