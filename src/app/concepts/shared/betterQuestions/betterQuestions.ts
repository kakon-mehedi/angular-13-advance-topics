import {
	BooleanQuestion,
	MultipleChoice,
	RangeQuestion,
} from './questionStrategies';

const LANGUAGES = ['CSS', 'HTML', 'JS', 'Python'];

export const betterQuestions = [
	new BooleanQuestion('This video is useful'),
	new BooleanQuestion('Are you sleeping?'),
	new MultipleChoice('What is your favorite language?', LANGUAGES),
	new RangeQuestion('What is the speed limit in your city'),
];
