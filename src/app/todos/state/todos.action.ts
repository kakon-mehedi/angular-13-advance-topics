import { createAction, props } from '@ngrx/store';
import { ITodo } from './todos.reducer';

export enum TodosActionType {
	ADD_TODO = '[Todo] Add Todo',
	UPDATE_TODO = '[Todo] Update Todo',
	DELETE_TODO = '[Todo] Delete Todo',
}

export const addTodo = createAction(TodosActionType.ADD_TODO, props<ITodo>());

export const updateTodo = createAction(
	TodosActionType.UPDATE_TODO,
	props<ITodo>()
);
export const deleteTodo = createAction(
	TodosActionType.DELETE_TODO,
	props<{ id: string }>()
);
