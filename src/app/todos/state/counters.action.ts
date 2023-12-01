import { createAction, props } from '@ngrx/store';

export enum CounterActionType {
	INCREMENT = '[Counter] Increment',
	DECREMENT = '[Counter] DECREMENT',
	RESET = '[Counter] RESET',
}

export const increment = createAction(
	CounterActionType.INCREMENT,
	props<{ incrementBy: number }>()
);
export const decrement = createAction(CounterActionType.DECREMENT);
export const reset = createAction(CounterActionType.RESET);
