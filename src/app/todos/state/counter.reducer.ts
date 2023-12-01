import * as CounterActions from './counters.action';
import { createReducer, on, props } from '@ngrx/store';

export interface ICounter {
	value: number;
}

export interface ICounterState {
	counter: ICounter;
}

const INITIAL_STATE: ICounterState = {
	counter: {
		value: 5,
	},
};

export const counterReducer = createReducer(
	INITIAL_STATE,

	on(CounterActions.increment, (state, props) => {
		return {
			...state,
			counter: {
				value: state.counter.value + props.incrementBy,
			},
		};
	}),

	on(CounterActions.decrement, (state) => {
		return {
			...state,
			counter: {
				value: state.counter.value - 1,
			},
		};
	}),

	on(CounterActions.reset, (state) => {
		return {
			...state,
			counter: {
				value: 0,
			},
		};
	})
);
