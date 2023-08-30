import { InjectionToken } from '@angular/core';

export interface User {
	name: string;
	age: number;
}

export interface Login {
	email: string;
	password: string;
}

export const users = [
	{
		name: 'Kakon',
		age: 20,
	},

	{
		name: 'Mehedi',
		age: 21,
	},

	{
		name: 'Hasan',
		age: 22,
	},
];

export enum OPERATION_STATUS {
	ON = 1,
	OFF = 0,
}

export const USER_TOKEN = new InjectionToken('kakonToken');
export const LOGIN_TOKEN = new InjectionToken<Login>('loginToken');
