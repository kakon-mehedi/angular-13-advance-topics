import { Component, OnInit } from '@angular/core';
import { Iwidget } from 'src/app/concepts/models/Iwidget';
import { WIDGET_TOKEN } from 'src/app/concepts/tokens/widgetToken';

@Component({
	selector: 'app-weather-widget',
	templateUrl: './weather-widget.component.html',
	styleUrls: ['./weather-widget.component.scss'],
	providers: [
		{
			provide: WIDGET_TOKEN,
			useExisting: WeatherWidgetComponent,
		},
	],
})
export class WeatherWidgetComponent implements OnInit, Iwidget {
	isLoading = false;

	constructor() {}

	ngOnInit(): void {}

	load() {
		console.log('Load data from JIRA API... ');
	}

	refresh() {
		this.isLoading = true;
		setTimeout(() => {
			this.isLoading = false;
		}, 2500);
	}
}
