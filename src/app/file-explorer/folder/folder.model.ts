import { Directory } from '../file-explorer.type';

export class Folder implements Directory {
	id: string | number = '';
	name: string;
	type?: string;
	size: string = '';
	child?: Directory[];

	constructor(name: string) {
		this.name = name;
		this.autoGenerateInfo();
	}

	autoGenerateInfo() {
		this.id = Math.floor(Math.random() * 9999999).toString();
		this.size = `${Math.floor(Math.random() * 99)}.jpg`;
        this.child = [];
	}
}
