import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState, type KeyboardEvent } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addTask, updateTask } from './tasks-slice';
import type { Task } from './tasks-types';

const MAX_TITLE = 200;
const MAX_DESCRIPTION = 2000;

interface TaskFormDialogProps {
  open: boolean;
  initialTask: Task | null;
  onClose: () => void;
}

export function TaskFormDialog({ open, initialTask, onClose }: TaskFormDialogProps) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle(initialTask?.title ?? '');
      setDescription(initialTask?.description ?? '');
      setTouched(false);
    }
  }, [open, initialTask]);

  const trimmedTitle = title.trim();
  const titleError =
    touched && trimmedTitle.length === 0
      ? 'Title is required'
      : title.length > MAX_TITLE
        ? `Maximum ${MAX_TITLE} characters`
        : '';
  const descriptionError =
    description.length > MAX_DESCRIPTION ? `Maximum ${MAX_DESCRIPTION} characters` : '';

  const canSubmit =
    trimmedTitle.length > 0 &&
    title.length <= MAX_TITLE &&
    description.length <= MAX_DESCRIPTION;

  function handleSubmit() {
    setTouched(true);
    if (!canSubmit) return;
    if (initialTask) {
      dispatch(updateTask({ id: initialTask.id, title, description }));
    } else {
      dispatch(addTask({ title, description }));
    }
    onClose();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      handleSubmit();
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" onKeyDown={handleKeyDown}>
      <DialogTitle>{initialTask ? 'Edit task' : 'New task'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onBlur={() => setTouched(true)}
            error={Boolean(titleError)}
            helperText={titleError || `${title.length}/${MAX_TITLE}`}
            inputProps={{ maxLength: MAX_TITLE + 50 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            maxRows={8}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            error={Boolean(descriptionError)}
            helperText={descriptionError || `${description.length}/${MAX_DESCRIPTION}`}
            inputProps={{ maxLength: MAX_DESCRIPTION + 100 }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!canSubmit}>
          {initialTask ? 'Save' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
