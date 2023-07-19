import { createAction, props } from '@ngrx/store';
import { Task, Column } from './store';

export enum DeskActionTypes  {
  ADD_TASK = '[Desk] Add task',
  ADD_COLUMN = '[Desk] Add column',
  DELETE_TASK = '[Desk] Delete task',
  UPDATE_COLUMN_TASKS_ORDER = '[Desk] Update column tasks order',
  LOAD_COLUMNS = '[Desk] Load columns'
}

export const loadColumns = createAction(DeskActionTypes.LOAD_COLUMNS);
export const addTask = createAction(DeskActionTypes.ADD_TASK, props<{ task: Task, columnIndex: number }>());
export const addColumn = createAction(DeskActionTypes.ADD_COLUMN, props<Column>());
export const updateColumnTasks = createAction(DeskActionTypes.UPDATE_COLUMN_TASKS_ORDER, props<{ tasks: Task[], columnIndex: number}>());
export const deleteTask = createAction(DeskActionTypes.DELETE_TASK, props<{columnIndex: number, taskIndex: number}>())
