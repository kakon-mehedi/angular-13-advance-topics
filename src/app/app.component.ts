import { AfterViewInit, Component, Self } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
	ngAfterViewInit(): void {}

	onBlur(event: any) {
		console.log('BLUR => ', event);
	}

	onChange(event: any) {
		console.log('CHANGE => ', event);
	}
}
