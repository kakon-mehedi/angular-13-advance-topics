import { TodosReducer } from './todos.reducer';
import * as fromTodos from './todos.reducer';

export interface ITodosModuleState {
	Todos: fromTodos.TodosState;
}

export const TodosFeatureKey = 'TodosFeatureKey';

export const TodosModuleReducers = {
	Todos: TodosReducer,
};
