import { ViewEncapsulation } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
	selector: 'app-pdf-components',
	templateUrl: './pdf-contents.html',
	styleUrls: ['./pdf-contents.scss'],
})
export class PdfContents {
	contents = [
		{
			Title: 'Content 1',
			Description: 'Description of content 1',
		},
		{
			Title: 'Content 2',
			Description: 'Description of content 2',
		},
		{
			Title: 'Content 3',
			Description: 'Description of content 3',
		},
	];
}
