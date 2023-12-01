import { ActionReducerMap } from '@ngrx/store';
import * as fromTodos from '../todos/state/todos.reducer';

export interface AppState {
	TodoList: fromTodos.TodosState;
}

// export const appReducer: ActionReducerMap<AppState> = {
// 	TodoList: fromTodos.TodosReducer,
// };
