import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-latest-ck-editor',
	templateUrl: './latest-ck-editor.component.html',
	styleUrls: ['./latest-ck-editor.component.scss'],
})
export class LatestCkEditorComponent implements OnInit {
	@Input()
	hasCustomEditorConfig: boolean = false;

	@Input()
	editorConfig: any = {};

	@Input()
	focusOnStart: boolean = true;

	@Output()
	blur: EventEmitter<any> = new EventEmitter();

	@Output()
	change: EventEmitter<any> = new EventEmitter();

	constructor() {}

	decoupledEditorCdnLocation =
		'https://cdn.jsdelivr.net/npm/@ckeditor/ckeditor5-build-decoupled-document@42.0.0/build/ckeditor.min.js';

	decoupledEditorOfflineLocation =
		'../../assets/ck-editor/ckeditor5/decoupled-editor.js';

	ckEditorCssFileLocation = '../../assets/ck-editor/ckeditor5/ckeditor5.css';
	customCssFileLocation = '../../assets/ck-editor/style.css';

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
		script.src = this.decoupledEditorOfflineLocation;
		script.onload = () => {
			this.initializeCKEditor();
		};
		document.body.appendChild(script);
	}

	initializeCKEditor(): void {
		const editorContainer = document.querySelector('#editor');
		if (editorContainer && (window as any).DecoupledEditor) {
			(window as any).DecoupledEditor.create(editorContainer)
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

					if (this.hasCustomEditorConfig) {
						this.setCustomEditorConfig(editor, this.editorConfig);
					}

					this.emitOutputValueEvents();
				})
				.catch((error: any) => {
					console.error('Error initializing CKEditor:', error);
				});
		} else {
			console.error('CKEditor not found or editorContainer is missing.');
		}
	}

	emitOutputValueEvents() {
		this.emitOnChangeOutputData();
		this.emitOnBlurOutputData();
	}

	emitOnChangeOutputData() {
		this.editorInstance.model.document.on('change:data', () => {
			const data = this.editorInstance.getData();
			this.change.emit(data);
		});
	}

	emitOnBlurOutputData() {
		this.editorInstance.ui.focusTracker.on('change:isFocused', () => {
			const data = this.editorInstance.getData();
			this.blur.emit(data);
		});
	}

	setCustomEditorConfig(editor: any, customConfig: any) {
		editor.config.set(customConfig);
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
