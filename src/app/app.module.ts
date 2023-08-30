import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResolutionModifiersComponent } from './concepts/components/resolution-modifiers/resolution-modifiers.component';
import { MaterialModule } from './shared/modules/material.module';
import { DependencyProvidersComponent } from './concepts/components/dependency-providers/dependency-providers.component';

@NgModule({
	declarations: [AppComponent, ResolutionModifiersComponent, DependencyProvidersComponent],
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
