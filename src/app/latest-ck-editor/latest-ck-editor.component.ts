import { Component, OnInit } from '@angular/core';

// import {
// 	ClassicEditor,
// 	Essentials,
// 	Bold,
// 	Italic,
// 	Font,
// 	Paragraph,
// } from 'ckeditor';

type EditorConfig = {
	plugins: any[];
	toolbar: string[];
};

@Component({
	selector: 'app-latest-ck-editor',
	templateUrl: './latest-ck-editor.component.html',
	styleUrls: ['./latest-ck-editor.component.scss'],
})
export class LatestCkEditorComponent implements OnInit {
	constructor() {}

	
	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.loadStyles();
		this.loadCKEditorMainJsFile();
	}

	ngOnDestroy(): void {
		
	}

	loadStyles() {
		const style = this.generateStyle('../../assets/ck-editor/style.css');
		const ckEditorStyle = this.generateStyle('../../assets/ck-editor/ckeditor5/ckeditor5.css');
		document.head.appendChild(style);
		document.head.appendChild(ckEditorStyle);

	}

	generateStyle(url: string): HTMLLinkElement {
		const link: HTMLLinkElement = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css')
		link.setAttribute('href', url);
		
		return link;
	}

	loadCKEditorMainJsFile() {
		const script: HTMLScriptElement = document.createElement('script');
		script.setAttribute('type', 'module');
		script.setAttribute('src', '../../assets/ck-editor/main.js');

		script.onload = () => {
			console.log('Script loaded');
		}

		document.body.appendChild(script);
	}
 
	
}
