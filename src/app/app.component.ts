import { Component, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
class CounterService1 {
	constructor() {}

	showInstanceDetails() {
		console.log('I am an Instance from CounterService 1');
	}

  increment(value: number) {
		return value + 1;
	}

	decrement(value: number) {
		return value - 1;
	}
}

@Injectable({
	providedIn: 'root',
})
class CounterService2 {
	constructor() {}

	showInstanceDetails() {
		console.log('I am an Instance from CounterService 2');
	}

	increment(value: number) {
		return value + 2;
	}

	decrement(value: number) {
		return value - 2;
	}
}
@Component({
	selector: 'app-dependency-in-depth',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [
		{
			provide: CounterService1,
			useClass: CounterService2,
		},
	],
})
export class MyComponent {
  counter = 0 ;
	constructor(private _cs1: CounterService1) {
		
	}

  inc() {
    this.counter = this._cs1.increment(this.counter);
  }

  dec() {
    this.counter = this._cs1.decrement(this.counter);
  }
}
