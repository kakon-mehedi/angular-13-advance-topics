import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
	selector: 'app-counter',
	templateUrl: './counter.component.html',
	styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
	@Input()
	startFrom!: number;

	@Output()
	startFromChange = new EventEmitter<number>();

	maxTime = 5;

	constructor() {}

	ngOnInit(): void {
		const counterIntervalRef = setInterval(()=>{
			if(this.startFrom >= this.maxTime){
				this.clearTimer(counterIntervalRef)
			} else {
				this.startFrom = this.startFrom + 1;
				this.startFromChange.emit(this.startFrom);
			}
		},1000)
	}

	clearTimer(counterRef: any){
		clearInterval(counterRef);
	}
}
