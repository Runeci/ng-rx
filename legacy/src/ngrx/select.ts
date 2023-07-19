import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ColumnState } from './store';

export const selectColumnState = createFeatureSelector<ColumnState>('columns');


export const selectColumns = createSelector(
  selectColumnState,
  (state) => state.columns,
);
