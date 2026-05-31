import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { Box, TextField, Button, Typography } from '@mui/material'
import type { Task } from '../../types'

export default function CreateTaskPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleCreate = () => {
    if (!title) return
    const tasks = queryClient.getQueryData<Task[]>(['tasks']) ?? []
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      createdAt: new Date(),
      status: 0,
    }
    queryClient.setQueryData<Task[]>(['tasks'], [...tasks, newTask])
    navigate('/')
  }

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Создать задачу</Typography>
      <TextField
        fullWidth
        label="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleCreate}>Создать</Button>
    </Box>
  )
}