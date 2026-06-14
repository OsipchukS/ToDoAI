import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSearch, setSearch } from '../features/tasks/tasks-slice';
import { ThemeToggle } from '../features/theme/ThemeToggle';

interface AppHeaderProps {
  onCreate: () => void;
}

export function AppHeader({ onCreate }: AppHeaderProps) {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
          Tasks
        </Typography>
        <Box sx={{ flexGrow: 1, maxWidth: 480 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => dispatch(setSearch(event.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => dispatch(setSearch(''))}
                    aria-label="Clear search"
                    edge="end"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        </Box>
        <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
          <ThemeToggle />
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onCreate}
            sx={{ whiteSpace: 'nowrap' }}
          >
            New task
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
