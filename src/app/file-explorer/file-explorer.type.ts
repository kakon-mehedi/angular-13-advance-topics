export interface Directory {
	id: string | number;
	name: string;
	type?: string;
	size: string;
	child?: Directory[]
}