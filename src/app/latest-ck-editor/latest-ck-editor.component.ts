import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'app-latest-ck-editor',
	templateUrl: './latest-ck-editor.component.html',
	styleUrls: ['./latest-ck-editor.component.scss'],
})
export class LatestCkEditorComponent implements OnInit {
	constructor() {}

	classicUrl =
		'https://cdn.ckeditor.com/ckeditor5/34.0.0/classic/ckeditor.js';
	coreCdnUrl = 'https://cdn.ckeditor.com/ckeditor5/42.0.0/ckeditor5.js';

	ckEditorCssFileLocation = '../../assets/ck-editor/ckeditor5/ckeditor5.css';
	customCssFileLocation = '../../assets/ck-editor/style.css';

	ckEditorCdnUrl = this.coreCdnUrl;
	editorInstance: any;

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.loadStyles();
		this.loadCKEditor();
	}

	ngOnDestroy(): void {
		if (this.editorInstance) {
			this.editorInstance.destroy();
		}
	}
	loadCKEditor(): void {
		const script = document.createElement('script');
		script.src =
			'https://cdn.jsdelivr.net/npm/@ckeditor/ckeditor5-build-decoupled-document@42.0.0/build/ckeditor.min.js';
		script.onload = () => {
			this.initializeCKEditor();
		};
		document.body.appendChild(script);
	}

	initializeCKEditor(): void {
		const editorContainer = document.querySelector('#editor');
		const plugins = (window as any).DecoupledEditor;
		if (editorContainer && (window as any).DecoupledEditor) {
			(window as any).DecoupledEditor.create(
				editorContainer
			)
				.then((editor: any) => {
					this.editorInstance = editor;
					const toolbarContainer =
						document.querySelector('#toolbar-container');
					if (toolbarContainer) {
						toolbarContainer.appendChild(
							editor.ui.view.toolbar.element
						);
					}

					const availablePlugins = editor.plugins;
 
					console.log('Available Plugins:', availablePlugins);
		   
					// editor.config.set({
					//   toolbar: {
					// 	items: [
					// 	  'undo',
					// 	  'redo',
					// 	  '|',
					// 	  'heading',
					// 	  '|',
					// 	  'fontSize',
					// 	  'fontFamily',
					// 	  'fontColor',
					// 	  'fontBackgroundColor',
					// 	  '|',
					// 	  'bold',
					// 	  'italic',
					// 	  'underline',
					// 	  '|',
					// 	  'link',
					// 	  'insertImage',
					// 	  'insertTable',
					// 	  'highlight',
					// 	  'blockQuote',
					// 	  '|',
					// 	  'alignment',
					// 	  '|',
					// 	  'bulletedList',
					// 	  'numberedList',
					// 	  'todoList',
					// 	  'indent',
					// 	  'outdent',
					// 	],
					// 	shouldNotGroupWhenFull: true,
					//   }
					// });

					this.editorInstance.model.document.on('change:data', () => {
						const data = this.editorInstance.getData();
						console.log('Content has changed:', data);
					});
				})
				.catch((error: any) => {
					console.error('Error initializing CKEditor:', error);
				});
		} else {
			console.error('CKEditor not found or editorContainer is missing.');
		}
	}
	getEditorContent(): void {
		if (this.editorInstance) {
			const content = this.editorInstance.getData();
			console.log('Current content:', content);
		}
	}

	setEditorContent(content: string): void {
		if (this.editorInstance) {
			this.editorInstance.setData(content);
		}
	}

	// pushAllRequiredPlugins(plugins: any[]): void {
	// 	const requiredPlugins = [
	// 		'Essentials',
	// 		'Bold',
	// 		'Italic',
	// 		'Font',
	// 		'Paragraph',
	// 	];

	// 	this.editorConfig.plugins = plugins.filter((plugin: any) => {
	// 		return plugin && requiredPlugins.includes(plugin.pluginName);
	// 	});

	// 	console.log(plugins);
	// }

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
}
