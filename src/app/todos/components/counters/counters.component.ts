import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCounterStates } from '../../state/counter.selectors';

@Component({
	selector: 'app-counters',
	templateUrl: './counters.component.html',
	styleUrls: ['./counters.component.scss'],
})
export class CountersComponent implements OnInit {
	initialCounterValue = 0;

	constructor(private counterStore: Store) {}

	ngOnInit(): void {
		this.counterStore.select(getCounterStates).subscribe((res) => {
			this.initialCounterValue = res;
		});
	}
}
