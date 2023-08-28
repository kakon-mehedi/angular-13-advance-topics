import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-velocity-widget',
	templateUrl: './velocity-widget.component.html',
	styleUrls: ['./velocity-widget.component.scss'],
})
export class VelocityWidgetComponent implements OnInit {
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
