import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
	public _level = 'Root';
	constructor() {}

	showInstanceLevel() {
		console.log(`Instance from ${this._level} level `);
	}

  log(mesage: string) {
    console.log(`${this._level}: ${mesage}`);
  }
}
