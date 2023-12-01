import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCounterStates } from '../../state/counter.selectors';
import * as counterActions from '../../state/counters.action';
import { MatButton } from '@angular/material/button';

@Component({
	selector: 'app-counters',
	templateUrl: './counters.component.html',
	styleUrls: ['./counters.component.scss'],
})
export class CountersComponent implements OnInit {
	@ViewChild('incrementInput') incrementInput!: any;
	isDisableDecrement = false;
	initialCounterValue = 0;

	constructor(private counterStore: Store) {}

	ngOnInit(): void {
		this.counterStore.select(getCounterStates).subscribe((res) => {
			this.initialCounterValue = res;

			if (this.initialCounterValue === 0) {
				this.isDisableDecrement = true;
			}
		});
	}

	increment(value: number) {
		if (value === 0) value = 1;
		this.isDisableDecrement = false;
		this.counterStore.dispatch(
			counterActions.increment({
				incrementBy: value,
			})
		);
	}

	decrement() {
		this.counterStore.dispatch(counterActions.decrement());
	}

	reset() {
		this.isDisableDecrement = false;
		this.counterStore.dispatch(counterActions.reset());
		this.incrementInput.nativeElement.value = null;
	}
}
