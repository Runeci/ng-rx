
export interface ColumnState {
  columns: Column[]
}

export interface Task {
  name: string
}

export interface Column {
    name: string,
    tasks: Task[]
}

export const initialColumnState: ColumnState = {
  columns: [
    { name: 'To do', tasks: [{name: 'Get to work'}, {name: 'Pick up groceries'}]
    },
    { name: 'Done', tasks: [{name: 'Brush teeth'}, {name: 'Pick up groceries'}]
    }]
}
