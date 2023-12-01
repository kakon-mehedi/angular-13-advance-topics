import { ITodo } from '../state/todos.reducer';

export const INITIAL_TODOS: ITodo[] = [
	{
		id: '1',
		title: 'Title for Todo 1',
		description: 'Description of Todo 1',
		isComplete: true,
	},

	{
		id: '2',
		title: 'Title for Todo 2',
		description: 'Description of Todo 2',
		isComplete: true,
	},

	{
		id: '3',
		title: 'Title for Todo 3',
		description: 'Description of Todo 3',
		isComplete: false,
	},

	{
		id: '4',
		title: 'Title for Todo 4',
		description: 'Description of Todo 4',
		isComplete: true,
	},

	{
		id: '5',
		title: 'Title for Todo 5',
		description: 'Description of Todo 5',
		isComplete: false,
	},
];
