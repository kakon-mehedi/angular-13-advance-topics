import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodosModuleState, TodosFeatureKey } from '.';

const getTodosModuleState =
	createFeatureSelector<ITodosModuleState>(TodosFeatureKey);

const getTodosState = createSelector(
	getTodosModuleState,
	(state: ITodosModuleState) => state.Todos
);

export const getTodos = createSelector(getTodosState, (state) => state.Todos);
