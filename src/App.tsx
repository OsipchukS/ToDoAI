import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo, useState } from 'react';
import { useAppSelector } from './app/hooks';
import { AppHeader } from './components/AppHeader';
import { ConfirmDeleteDialog } from './features/tasks/ConfirmDeleteDialog';
import { TaskFilters } from './features/tasks/TaskFilters';
import { TaskFormDialog } from './features/tasks/TaskFormDialog';
import { TaskList } from './features/tasks/TaskList';
import type { Task } from './features/tasks/tasks-types';
import { buildTheme } from './features/theme/theme-config';
import { selectThemeMode } from './features/theme/theme-slice';

export function App() {
  const mode = useAppSelector(selectThemeMode);
  const theme = useMemo(() => buildTheme(mode), [mode]);

  const [formOpen, setFormOpen] = useState(false);
  const [formInitial, setFormInitial] = useState<Task | null>(null);
  const [confirmDeleteTask, setConfirmDeleteTask] = useState<Task | null>(null);

  function openCreate() {
    setFormInitial(null);
    setFormOpen(true);
  }

  function openEdit(task: Task) {
    setFormInitial(task);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
  }

  function openDelete(task: Task) {
    setConfirmDeleteTask(task);
  }

  function closeDelete() {
    setConfirmDeleteTask(null);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader onCreate={openCreate} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <TaskFilters />
        <TaskList onEdit={openEdit} onDelete={openDelete} />
      </Container>
      <TaskFormDialog open={formOpen} initialTask={formInitial} onClose={closeForm} />
      <ConfirmDeleteDialog
        open={confirmDeleteTask !== null}
        task={confirmDeleteTask}
        onClose={closeDelete}
      />
    </ThemeProvider>
  );
}
