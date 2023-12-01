import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/modules/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromApp from './app-state/app.reducers';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MaterialModule,
		BrowserAnimationsModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
