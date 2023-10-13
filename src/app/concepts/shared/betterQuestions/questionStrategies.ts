import { IQuestion } from './question.interface';

export class BooleanQuestion implements IQuestion {
	constructor(public description = '') {}

	printQuiz(): void {
		console.log(this.description);
		console.log('1. True');
		console.log('2. False');
	}
}

export class MultipleChoice implements IQuestion {
	constructor(public description = '', public options: any[] = []) {}

	printQuiz(): void {
		console.log(this.description);

		this.options.forEach((option: any, index: number) => {
			console.log(`${index + 1}. ${option}`);
		});
	}
}

export class RangeQuestion implements IQuestion {
	constructor(public description = '') {}

	printQuiz(): void {
		console.log(this.description);
		console.log('Minimum: .');
		console.log('Maximum: .');
	}
}
