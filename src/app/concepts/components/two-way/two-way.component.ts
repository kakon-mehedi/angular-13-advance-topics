import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-two-way',
	templateUrl: './two-way.component.html',
	styleUrls: ['./two-way.component.scss'],
})
export class TwoWayComponent implements OnInit {
	myName: string = '';
	counterValue = 1;

	constructor() {
		setTimeout(() => {
			this.counterValue = 0;
		}, 10000);
	}

	ngOnInit(): void {}
}
