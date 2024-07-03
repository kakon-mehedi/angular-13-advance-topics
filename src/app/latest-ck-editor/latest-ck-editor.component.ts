import { AfterViewInit, Component, OnInit } from '@angular/core';
@Component({
	selector: 'app-latest-ck-editor',
	templateUrl: './latest-ck-editor.component.html',
	styleUrls: ['./latest-ck-editor.component.scss'],
})
export class LatestCkEditorComponent implements OnInit, AfterViewInit {
	mainJsFileLocation = '../../assets/ck-editor/main.js';
	ckEditorCssFileLocation = '../../assets/ck-editor/ckeditor5/ckeditor5.css';
	customCssFileLocation = '../../assets/ck-editor/style.css';

	constructor() {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.loadStyles();
		this.loadCKEditorMainJsFile();
	}

	ngOnDestroy(): void {}

	loadStyles() {
		const style = this.generateStyle(this.customCssFileLocation);
		const ckEditorStyle = this.generateStyle(this.ckEditorCssFileLocation);
		document.head.appendChild(style);
		document.head.appendChild(ckEditorStyle);
	}

	generateStyle(url: string): HTMLLinkElement {
		const link: HTMLLinkElement = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css');
		link.setAttribute('href', url);

		return link;
	}

	loadCKEditorMainJsFile() {
		const script: HTMLScriptElement = document.createElement('script');
		script.setAttribute('type', 'module');
		script.setAttribute('src', this.mainJsFileLocation);

		script.onload = () => {
			console.log('Script loaded');
		};

		document.body.appendChild(script);
	}
}
