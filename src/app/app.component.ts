import { Component, ElementRef, ViewChild } from '@angular/core';
import html2pdf from 'html2pdf.js';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

// Ensure the pdfMake uses vfs_fonts
(pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	@ViewChild('pdfContent') elementRef!: ElementRef;
	items = new Array(500);

	options = {
		margin: 1,
		filename: 'newfile.pdf',
		image: {
			type: 'jpeg',
			quality: '0.90',
		},
		html2canvas: {
			scale: 2,
		},
		jsPDF: {
			unit: 'in',
			format: 'letter',
			orientation: 'portrait',
		},
	};

	exportToPdf() {
		this.exportByPdfMake();
	}

	exportPdfByHtml2PdfPackage() {
		html2pdf().from(this.elementRef.nativeElement).set(this.options).save();
	}

	exportPdfByControlP() {
		const popup = window.open(
			'Angular Large Table to pdf',
			'_blank',
			'width=768,height=auto'
		);

		const elementString: string = this.elementRef.nativeElement.innerHTML;
		const dummuContent: string =
			'<html><head>' +
			'<link rel="stylesheet" href="' +
			'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"/>' +
			'<style type="text/css">' +
			'.pageFooter {' +
			'    display: table-footer-group;' +
			'    counter-increment: page;' +
			'}' +
			'.pageFooter:after {' +
			'   content: "Page " counter(page)' +
			'}' +
			'</style>' +
			'</head><body onload="window.print();window.close()">' +
			elementString +
			'</body></html>';

		popup?.document.write(dummuContent);

		// popup?.close();
	}

	exportByPdfMake() {
		// Get the HTML element to export
		const contentElement = this.elementRef.nativeElement;
		if (contentElement) {
			// Convert the HTML to pdfMake content
			const html = contentElement.innerHTML;
			const pdfContent = htmlToPdfmake(html);

			// Create the PDF document definition
			const documentDefinition = {
				content: pdfContent,
			};

			// Generate the PDF
			pdfMake.createPdf(documentDefinition).download('exported.pdf');
		}
	}
}
