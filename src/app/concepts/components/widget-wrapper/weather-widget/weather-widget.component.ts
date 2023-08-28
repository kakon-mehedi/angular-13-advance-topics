import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-weather-widget',
	templateUrl: './weather-widget.component.html',
	styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent implements OnInit {
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
