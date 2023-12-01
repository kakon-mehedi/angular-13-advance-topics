import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodosModuleState, TodosFeatureKey } from '.';

const getTodosModuleState =
	createFeatureSelector<ITodosModuleState>(TodosFeatureKey);

const getCountersState = createSelector(
	getTodosModuleState,
	(state: ITodosModuleState) => state.Counter
);

export const getCounterStates = createSelector(
	getCountersState,
	(state) => state.counter.value
);
