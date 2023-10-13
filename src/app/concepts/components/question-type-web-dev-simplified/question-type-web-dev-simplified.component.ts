import { Component, OnInit } from '@angular/core';
import { betterQuestions } from '../../shared/betterQuestions/betterQuestions';
import { IQuestion } from '../../shared/betterQuestions/question.interface';

@Component({
	selector: 'app-question-type-web-dev-simplified',
	templateUrl: './question-type-web-dev-simplified.component.html',
	styleUrls: ['./question-type-web-dev-simplified.component.scss'],
})
export class QuestionTypeWebDevSimplifiedComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {
		//this.printQuiz(questions);
		this.printQuizUsingStrategyPattern(betterQuestions);
	}

	/**
	 * This is wrong approach because if we add any new question type in the questions array then we have to add new case of this switch block every time. Which violets the open close principal as well.
	 * @param {Array} questions
	 */
	printQuiz(questions: Array<any>) {
		for (let question of questions) {
			console.log(question.description);
			switch (question.type) {
				case 'boolean':
					console.log('1. True');
					console.log('2. False');
					break;
				case 'multipleChoice':
					question.options.forEach((option: any, index: number) => {
						console.log(`${index + 1}. ${option}`);
					});
					break;
				case 'text':
					console.log('Answer: .');
					break;
				case 'range':
					console.log('Minimum: .');
					console.log('Maximum: .');
					break;
			}
			console.log('');
		}
	}

	/**
	 * We are putting each question type in a separate class, and each class implement a common interface IQuestion. So that we can use all the common properties and method from the all new classes.
	 * @param questions
	 */
	printQuizUsingStrategyPattern(questions: Array<IQuestion>) {
		for (let question of questions) {
			question.printQuiz();
			console.log('');
		}
	}
}
