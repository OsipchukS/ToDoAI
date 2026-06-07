import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useAppDispatch } from '../../app/hooks';
import { toggleTask } from './tasks-slice';
import type { Task } from './tasks-types';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

function formatRelative(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const seconds = Math.round(diffMs / 1000);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  if (Math.abs(seconds) < 60) return rtf.format(-seconds, 'second');
  const minutes = Math.round(seconds / 60);
  if (Math.abs(minutes) < 60) return rtf.format(-minutes, 'minute');
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(-hours, 'hour');
  const days = Math.round(hours / 24);
  if (Math.abs(days) < 30) return rtf.format(-days, 'day');
  const months = Math.round(days / 30);
  if (Math.abs(months) < 12) return rtf.format(-months, 'month');
  const years = Math.round(months / 12);
  return rtf.format(-years, 'year');
}

export function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  const dispatch = useAppDispatch();
  const completed = task.status === 'completed';
  const toggleLabel = completed
    ? `Mark "${task.title}" as active`
    : `Mark "${task.title}" as completed`;

  return (
    <ListItem
      disablePadding
      divider
      secondaryAction={
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit">
            <IconButton
              edge="end"
              aria-label={`Edit "${task.title}"`}
              onClick={() => onEdit(task)}
            >
              <EditOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              edge="end"
              aria-label={`Delete "${task.title}"`}
              onClick={() => onDelete(task)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      }
    >
      <ListItemButton onClick={() => dispatch(toggleTask(task.id))} sx={{ pr: 12 }}>
        <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
          <Checkbox
            edge="start"
            checked={completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-label': toggleLabel }}
          />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                textDecoration: completed ? 'line-through' : 'none',
                color: completed ? 'text.secondary' : 'text.primary',
                wordBreak: 'break-word',
              }}
            >
              {task.title}
            </Typography>
          }
          secondary={
            <Box sx={{ mt: 0.5 }}>
              {task.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    mb: 0.5,
                  }}
                >
                  {task.description}
                </Typography>
              )}
              <Typography variant="caption" color="text.disabled">
                Created {formatRelative(task.createdAt)}
              </Typography>
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
