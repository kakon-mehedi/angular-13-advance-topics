import { INITIAL_TODOS } from '../constants/todos.constants';
import { TodosActions, TodosActionType } from './todos.action';

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

export function TodosReducer(
	state = INITIAL_STATE,
	action: TodosActions
): TodosState {
	switch (action.type) {
		case TodosActionType.ADD_TODO:
			return {
				...state,
				Todos: [...state.Todos, action.payload],
			};
		case TodosActionType.UPDATE_TODO:
			const todoThatNeedToUpdate = state.Todos.find(
				(todo) => todo.id === action.payload.id
			);
			const updatedTodo = { ...todoThatNeedToUpdate, ...action.payload }; // copied immutively
			const updatedTodos = [...state.Todos, updatedTodo]; // updated immutively

			return {
				...state,
				Todos: updatedTodos,
			};

		case TodosActionType.DELETE_TODO:
			return {
				...state,
				Todos: state.Todos.filter((todo) => todo.id !== action.payload),
			};
		default:
			return state;
	}
}
