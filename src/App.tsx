import { Routes, Route, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import BoardPage from './pages/BoardPage/BoardPage'
import TaskPage from './pages/TaskPage/TaskPage'
import CreateTaskPage from './pages/CreateTaskPage/CreateTaskPage'

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            📋 Доска задач
          </Typography>
          <Button color="inherit" component={Link} to="/">Доска</Button>
          <Button color="inherit" component={Link} to="/create">Создать задачу</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Routes>
          <Route path="/" element={<BoardPage />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/create" element={<CreateTaskPage />} />
        </Routes>
      </Box>
    </>
  )
}