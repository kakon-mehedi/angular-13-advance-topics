import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
	prefix: string = 'Root';
	name: string = 'Kakon Mehedi';
	age: number = 20;

	constructor() {
		console.log('I am Logger service class');
	}

	logMessage() {
		console.log(`I am instance of ===> ${this.prefix}`);
	}
}
