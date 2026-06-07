import { configureStore, type Middleware } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasks-slice';
import themeReducer, { type ThemeState } from '../features/theme/theme-slice';
import type { TasksState } from '../features/tasks/tasks-types';
import { loadState, saveState } from '../lib/storage';

export interface PersistedState {
  tasks: TasksState;
  theme: ThemeState;
}

const preloadedState = loadState<PersistedState>();

const persistMiddleware: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  saveState(storeApi.getState());
  return result;
};

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    theme: themeReducer,
  },
  preloadedState,
  middleware: (getDefault) => getDefault().concat(persistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
