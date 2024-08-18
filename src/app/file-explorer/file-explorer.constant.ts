import { Directory } from './file-explorer.type';

export const data: Directory[] = [
	{
		id: 1,
		name: 'Test',
		size: '20KB',
		child: [
			{
				id: 1,
				name: 'Family',
				size: '20KB',
				child: [
					{
						id: 2,
						name: 'Family Cover',
						type: 'png',
						size: '200KB',
					},
					{
						id: 1,
						name: 'Readme',
						type: 'md',
						size: '200KB',
					},
				],
			},
		],
	},

	{
		id: 2,
		name: 'Tour Cover',
		type: 'png',
		size: '200KB',
	},
	{
		id: 3,
		name: 'Next',
		type: 'txt',
		size: '200KB',
	},

];
