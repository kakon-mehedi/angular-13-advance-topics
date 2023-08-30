import { Component, ContentChild, OnInit } from '@angular/core';
import { Iwidget } from '../../models/Iwidget';
import { WIDGET_TOKEN } from '../../tokens/widgetToken';

@Component({
	selector: 'app-widget-wrapper',
	templateUrl: './widget-wrapper.component.html',
	styleUrls: ['./widget-wrapper.component.scss'],
})
export class WidgetWrapperComponent implements OnInit {
	/* Detecting Components Content Referrence */

	@ContentChild(WIDGET_TOKEN)
	widget!: Iwidget;

	constructor() {}

	ngOnInit(): void {}

	onRefresh() {
		this.widget.refresh();
	}
}
