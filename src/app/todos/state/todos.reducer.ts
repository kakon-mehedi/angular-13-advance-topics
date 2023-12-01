import { Action, createReducer, on } from '@ngrx/store';
import { INITIAL_TODOS } from '../constants/todos.constants';

import * as TodosActions from './todos.action';

export interface ITodo {
	id: string;
	title: string;
	description: string;
	isComplete: boolean;
}

export interface TodosState {
	Todos: ITodo[];
}

const INITIAL_STATE: TodosState = {
	Todos: INITIAL_TODOS,
};

export const TodosReducer = createReducer(
	INITIAL_STATE,

	on(TodosActions.addTodo, (state, props) => {
		return {
			...state,
			Todos: [...state.Todos, props],
		};
	}),

	on(TodosActions.updateTodo, (state, props) => {
		const todoThatNeedToUpdate = state.Todos.find(
			(todo) => todo.id === props.id
		);
		const updatedTodo = { ...todoThatNeedToUpdate, ...props };
		const updatedTodos = [...state.Todos, updatedTodo];

		return {
			...state,
			Todos: updatedTodos,
		};
	}),

	on(TodosActions.deleteTodo, (state, props) => {
		return {
			...state,
			Todos: state.Todos.filter((todo) => todo.id !== props.id),
		};
	})
);
