import { Box, Stack, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface EmptyStateProps {
  hasAnyTask: boolean;
}

export function EmptyState({ hasAnyTask }: EmptyStateProps) {
  const Icon = hasAnyTask ? SearchOffIcon : InboxIcon;
  const title = hasAnyTask ? 'No matching tasks' : 'No tasks yet';
  const subtitle = hasAnyTask
    ? 'Try a different filter or search query.'
    : 'Click "New task" to create your first one.';

  return (
    <Box sx={{ py: 8, textAlign: 'center' }}>
      <Stack alignItems="center" spacing={1.5}>
        <Icon sx={{ fontSize: 64, color: 'text.disabled' }} />
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.disabled">
          {subtitle}
        </Typography>
      </Stack>
    </Box>
  );
}
