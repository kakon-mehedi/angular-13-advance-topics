import { AfterViewInit, Component, Self } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
	ngAfterViewInit(): void {
		this.loadCKEditor();
	}

	loadCKEditor(): void {
		
	}
}
