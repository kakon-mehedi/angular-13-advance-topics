import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-hello-world',
	templateUrl: './hello-world.component.html',
	styleUrls: ['./hello-world.component.scss'],
})
export class HelloWorldComponent implements OnInit, Iuser, Student {
	constructor() {}
	ngOnInit(): void {}

	/* Implementing Student Type */

	school: string = 'Ekhlas';
	roll: number = 7;
	resultSum = (num1: number, num2: number) => {
		return num1 + num2;
	};

	/* Implementing Iuser Interface */

	myname = 'Kakon';
	age: number = 26;

	arithmatic = function (x: number, y: number) {
		return x + y;
	};
	stringFn = (str: string) => str.toUpperCase();

	/* Implementing BmiFn Interface */

	BMI: BmiFn = (w: number, h: number) => {
		return w / h;
	};
}

export interface Iuser {
	myname: string;
	age: number;
	arithmatic: (x: number, y: number) => number;
	stringFn: (str: string) => string;
}

export type Student = {
	school: string;
	roll: number;
	resultSum: (gpa1: number, gpa2: number) => number;
};

export interface BmiFn {
	(wight: number, height: number): number;
}
