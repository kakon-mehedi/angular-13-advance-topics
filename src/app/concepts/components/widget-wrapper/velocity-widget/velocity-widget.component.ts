import { Component, OnInit } from '@angular/core';
import { Iwidget } from 'src/app/concepts/models/Iwidget';
import { WIDGET_TOKEN } from 'src/app/concepts/tokens/widgetToken';

@Component({
	selector: 'app-velocity-widget',
	templateUrl: './velocity-widget.component.html',
	styleUrls: ['./velocity-widget.component.scss'],
	providers: [
		{
			provide: WIDGET_TOKEN,
			useExisting: VelocityWidgetComponent,
		},
	],
})
export class VelocityWidgetComponent implements OnInit, Iwidget {
	isRefreshing = false;

	constructor() {}

	ngOnInit(): void {}

	load() {
		console.log('Load data from JIRA API... ');
	}

	refresh() {
		this.isRefreshing = true;
		setTimeout(() => {
			this.isRefreshing = false;
		}, 2500);
	}
}
