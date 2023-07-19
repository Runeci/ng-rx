import { Action, ActionReducer, createReducer, INIT, MetaReducer, on, UPDATE } from '@ngrx/store';
import { addColumn, addTask, deleteTask, updateColumnTasks } from './actions';
import { initialColumnState } from './store';
import { merge } from 'rxjs';



export const hydrationMetaReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem("state");
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem("state");
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem("state", JSON.stringify(nextState));
    return nextState;
  };
};

export const metaReducers: MetaReducer[] = [
  hydrationMetaReducer
]

export function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  return function(state: S, action: A): S {
    const nextState = reducer(state, action);
    const savedState = JSON.parse(localStorage.getItem('__storage__')!) || {};
    // @ts-ignore
    merge(nextState, savedState);
    // @ts-ignore
    localStorage.setItem('__storage__', nextState)
    return nextState;
  };
}

// export const metaReducers: MetaReducer<any>[] = [storageMetaReducer];

export const columnsReducer = createReducer(
  initialColumnState,
  on(addColumn, (state, column) => {
    return {
      ...state,
      columns: [...state.columns, column]
    }
  }),
  on(addTask, (state, {task, columnIndex}) => {
    const updatedColumns = state.columns
      .map((i, index) => index === columnIndex ? {...i, tasks: [...i.tasks, task]} : i);
    return {
      ...state,
      columns: [...updatedColumns],
    }
  }),
  on(updateColumnTasks, (state, { tasks, columnIndex }) => {
    const updatedColumns = state.columns.map((i, index) => index === columnIndex
      ? {...i, tasks: [...tasks]} : i);
    return {
      ...state,
      columns: updatedColumns
    }
  }),
  on(deleteTask, (state, { columnIndex, taskIndex}) => {
    const updatedTasks =  [...state.columns[columnIndex].tasks.filter((i, index) => index !== taskIndex)];
    const updatedColumns = state.columns
      .map((i, index) => index === columnIndex
        ? {...i, tasks: [...updatedTasks]}
        : i);
    return {
      ...state,
      columns: updatedColumns
    }
  })
)


