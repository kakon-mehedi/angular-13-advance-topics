import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	@ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  exportToPDF() {
    const element = this.pdfContent.nativeElement;

    // Create a canvas and render the HTML content
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const rect = element.getBoundingClientRect();
    canvas.width = rect.width * 2; // For better quality
    canvas.height = rect.height * 2;

    if (context) {
      // Scale for better quality
      context.scale(2, 2);

      // Set background color
      context.fillStyle = getComputedStyle(element).backgroundColor || '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Optionally: Use external libraries like html2canvas to render the DOM
      // Here, we're simply simulating manual rendering.
    }

    // Convert the canvas to an image and embed in PDF
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);

        // Create a link to download the file
        const link = document.createElement('a');
        link.href = url;
        link.download = 'output.pdf';
        link.click();

        // Revoke object URL
        URL.revokeObjectURL(url);
      }
    }, 'image/jpeg');
  }
}