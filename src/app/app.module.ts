import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VelocityWidgetComponent } from './concepts/components/widget-wrapper/velocity-widget/velocity-widget.component';
import { WeatherWidgetComponent } from './concepts/components/widget-wrapper/weather-widget/weather-widget.component';
import { WidgetWrapperComponent } from './concepts/components/widget-wrapper/widget-wrapper.component';
import { MaterialModule } from './shared/modules/material.module';

@NgModule({
	declarations: [
		AppComponent,
		WidgetWrapperComponent,
		VelocityWidgetComponent,
		WeatherWidgetComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MaterialModule,
		BrowserAnimationsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
