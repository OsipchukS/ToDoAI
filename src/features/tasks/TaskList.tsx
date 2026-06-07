import { List, Paper } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { EmptyState } from '../../components/EmptyState';
import { selectAllTasks, selectVisibleTasks } from './tasks-slice';
import { TaskItem } from './TaskItem';
import type { Task } from './tasks-types';

interface TaskListProps {
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskList({ onEdit, onDelete }: TaskListProps) {
  const tasks = useAppSelector(selectVisibleTasks);
  const totalCount = useAppSelector((state) => selectAllTasks(state).length);

  if (tasks.length === 0) {
    return <EmptyState hasAnyTask={totalCount > 0} />;
  }

  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <List disablePadding>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </List>
    </Paper>
  );
}
