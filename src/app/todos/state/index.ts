import * as fromTodos from './todos.reducer';
import * as fromCounter from './counter.reducer';

export interface ITodosModuleState {
	Todos: fromTodos.ITodosState;
	Counter: fromCounter.ICounterState;
}

export const TodosModuleReducers = {
	Todos: fromTodos.TodosReducer,
	Counter: fromCounter.counterReducer,
};

export const CounterFeatureKey = 'CounterFeatureKey';
export const TodosFeatureKey = 'TodosFeatureKey';
