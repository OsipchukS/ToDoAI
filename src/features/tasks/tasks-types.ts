export type TaskStatus = 'active' | 'completed';
export type Filter = 'all' | 'active' | 'completed';
export type SortBy = 'createdAt' | 'updatedAt' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: number;
  updatedAt: number;
}

export interface TasksState {
  items: Task[];
  filter: Filter;
  search: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
}
