import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { deleteTask } from './tasks-slice';
import type { Task } from './tasks-types';

interface ConfirmDeleteDialogProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
}

export function ConfirmDeleteDialog({ open, task, onClose }: ConfirmDeleteDialogProps) {
  const dispatch = useAppDispatch();

  function handleConfirm() {
    if (task) dispatch(deleteTask(task.id));
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete task?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {task ? `"${task.title}" will be removed. This action cannot be undone.` : ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={handleConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
