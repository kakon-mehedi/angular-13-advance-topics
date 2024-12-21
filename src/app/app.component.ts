import {
	ChangeDetectorRef,
	Component,
	ComponentFactoryResolver,
	ComponentRef,
	ElementRef,
	Renderer2,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import domToPdf from 'dom-to-pdf';
import printJS from 'print-js';
import { PdfContents } from './pdf-contents/pdf-contents';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	value = false;

	@ViewChild('container', { read: ViewContainerRef, static: false })
	container!: ViewContainerRef;

	constructor(private cdr: ChangeDetectorRef) {}

	exportToPdf2() {
		const element: HTMLElement = this.resolveComponent();
		this.print(element);
	}

	resolveComponent(): HTMLElement {
		if (!this.container) {
			throw new Error('ViewContainerRef is not initialized.');
		}

		// Use createComponent to dynamically create the component
		const componentRef: ComponentRef<PdfContents> =
			this.container.createComponent(PdfContents);

		// Access the native element
		const nativeElement = componentRef.location.nativeElement;

		// Removing native element adding with the DOM view
		// componentRef.destroy();

		return nativeElement;
	}

	exportToPdf() {
		// Dynamically create the PdfContents component
		const componentRef: ComponentRef<PdfContents> =
			this.container.createComponent(PdfContents);

		// Ensure rendering completes
		this.cdr.detectChanges();

		// Access the native element
		const nativeElement = componentRef.location.nativeElement;

		// Temporarily append the element to the body for printing
		const tempContainer = document.createElement('div');
		//tempContainer.style.visibility = 'hidden';
		document.body.appendChild(tempContainer);
		tempContainer.appendChild(nativeElement);

		// Trigger the print operation
		setTimeout(() => {
			this.print(nativeElement);

			// Clean up the temporary container after printing
			document.body.removeChild(tempContainer);
			componentRef.destroy(); // Destroy the dynamically created component
		}, 0);
	}

	print(element: HTMLElement) {
		printJS({
			printable: element,
			type: 'html',
			targetStyles: ['*'],
			showModal: false,
		});
	}
}
