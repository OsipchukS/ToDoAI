import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../../lib/id';
import type { Filter, SortBy, SortOrder, Task, TasksState } from './tasks-types';

const initialState: TasksState = {
  items: [],
  filter: 'all',
  search: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.items.unshift(action.payload);
      },
      prepare(payload: { title: string; description: string }) {
        const now = Date.now();
        return {
          payload: {
            id: generateId(),
            title: payload.title.trim(),
            description: payload.description.trim(),
            status: 'active' as const,
            createdAt: now,
            updatedAt: now,
          },
        };
      },
    },
    updateTask(
      state,
      action: PayloadAction<{ id: string; title: string; description: string }>,
    ) {
      const task = state.items.find((item) => item.id === action.payload.id);
      if (task) {
        task.title = action.payload.title.trim();
        task.description = action.payload.description.trim();
        task.updatedAt = Date.now();
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleTask(state, action: PayloadAction<string>) {
      const task = state.items.find((item) => item.id === action.payload);
      if (task) {
        task.status = task.status === 'active' ? 'completed' : 'active';
        task.updatedAt = Date.now();
      }
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSort(state, action: PayloadAction<{ sortBy: SortBy; sortOrder: SortOrder }>) {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  setFilter,
  setSearch,
  setSort,
} = tasksSlice.actions;

export default tasksSlice.reducer;

type WithTasks = { tasks: TasksState };

export const selectAllTasks = (state: WithTasks): Task[] => state.tasks.items;
export const selectFilter = (state: WithTasks): Filter => state.tasks.filter;
export const selectSearch = (state: WithTasks): string => state.tasks.search;

export const selectSort = createSelector(
  (state: WithTasks) => state.tasks.sortBy,
  (state: WithTasks) => state.tasks.sortOrder,
  (sortBy, sortOrder) => ({ sortBy, sortOrder }),
);

export const selectStats = createSelector([selectAllTasks], (items) => ({
  total: items.length,
  active: items.filter((task) => task.status === 'active').length,
  completed: items.filter((task) => task.status === 'completed').length,
}));

export const selectVisibleTasks = createSelector(
  [selectAllTasks, selectFilter, selectSearch, selectSort],
  (items, filter, search, sort) => {
    const query = search.trim().toLowerCase();
    const filtered = items.filter((task) => {
      if (filter !== 'all' && task.status !== filter) return false;
      if (query.length === 0) return true;
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    });
    const direction = sort.sortOrder === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (sort.sortBy === 'title') {
        return a.title.localeCompare(b.title) * direction;
      }
      return (a[sort.sortBy] - b[sort.sortBy]) * direction;
    });
  },
);
