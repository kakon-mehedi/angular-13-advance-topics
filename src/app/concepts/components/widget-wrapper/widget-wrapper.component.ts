import { Component, ContentChild, OnInit } from '@angular/core';
import { VelocityWidgetComponent } from './velocity-widget/velocity-widget.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';

@Component({
	selector: 'app-widget-wrapper',
	templateUrl: './widget-wrapper.component.html',
	styleUrls: ['./widget-wrapper.component.scss'],
})
export class WidgetWrapperComponent implements OnInit {
	/* Detecting Components Content Referrence */

	@ContentChild(VelocityWidgetComponent)
	velocityCompRef!: VelocityWidgetComponent;

	@ContentChild(WeatherWidgetComponent)
	weatherCompRef!: WeatherWidgetComponent;

	constructor() {}

	ngOnInit(): void {}

	onRefresh() {
		if (this.velocityCompRef) {
			this.velocityCompRef.refresh();
		}

		if (this.weatherCompRef) {
			this.weatherCompRef.refresh();
		}
	}
}
