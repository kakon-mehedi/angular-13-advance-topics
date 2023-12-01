import { Action } from '@ngrx/store';
import { ITodo } from './todos.reducer';

export enum TodosActionType {
	ADD_TODO = '[Todo] Add Todo',
	UPDATE_TODO = '[Todo] Update Todo',
	DELETE_TODO = '[Todo] Delete Todo',
}

export type TodosActions = AddTodo | UpdateTodo | DeleteTodo;

export class AddTodo implements Action {
	readonly type = TodosActionType.ADD_TODO;

	constructor(public payload: ITodo) {}
}

export class UpdateTodo implements Action {
	readonly type = TodosActionType.UPDATE_TODO;

	constructor(public payload: ITodo) {}
}

export class DeleteTodo implements Action {
	readonly type = TodosActionType.DELETE_TODO;

	constructor(public payload: string) {}
}
