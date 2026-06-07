import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Tooltip,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SortIcon from '@mui/icons-material/Sort';
import { useState, type SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFilter, selectSort, selectStats, setFilter, setSort } from './tasks-slice';
import type { Filter, SortBy, SortOrder } from './tasks-types';

interface SortOption {
  label: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
}

const SORT_OPTIONS: SortOption[] = [
  { label: 'Newest first', sortBy: 'createdAt', sortOrder: 'desc' },
  { label: 'Oldest first', sortBy: 'createdAt', sortOrder: 'asc' },
  { label: 'Recently updated', sortBy: 'updatedAt', sortOrder: 'desc' },
  { label: 'Title A-Z', sortBy: 'title', sortOrder: 'asc' },
  { label: 'Title Z-A', sortBy: 'title', sortOrder: 'desc' },
];

export function TaskFilters() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const stats = useAppSelector(selectStats);
  const sort = useAppSelector(selectSort);
  const [sortAnchor, setSortAnchor] = useState<HTMLElement | null>(null);

  function handleFilterChange(_event: SyntheticEvent, value: Filter) {
    dispatch(setFilter(value));
  }

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      justifyContent="space-between"
      spacing={1}
      sx={{ mb: 2 }}
    >
      <Tabs
        value={filter}
        onChange={handleFilterChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab value="all" label={`All (${stats.total})`} />
        <Tab value="active" label={`Active (${stats.active})`} />
        <Tab value="completed" label={`Completed (${stats.completed})`} />
      </Tabs>
      <Box>
        <Tooltip title="Sort">
          <IconButton
            onClick={(event) => setSortAnchor(event.currentTarget)}
            aria-label="Sort tasks"
          >
            <SortIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={sortAnchor}
          open={sortAnchor !== null}
          onClose={() => setSortAnchor(null)}
        >
          {SORT_OPTIONS.map((option) => {
            const isActive =
              option.sortBy === sort.sortBy && option.sortOrder === sort.sortOrder;
            return (
              <MenuItem
                key={`${option.sortBy}-${option.sortOrder}`}
                selected={isActive}
                onClick={() => {
                  dispatch(
                    setSort({ sortBy: option.sortBy, sortOrder: option.sortOrder }),
                  );
                  setSortAnchor(null);
                }}
              >
                <Box
                  sx={{
                    width: 24,
                    display: 'inline-flex',
                    alignItems: 'center',
                    mr: 1,
                  }}
                >
                  {isActive && <CheckIcon fontSize="small" />}
                </Box>
                {option.label}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
    </Stack>
  );
}
