import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/modules/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MaterialModule,
		BrowserAnimationsModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		HttpClientModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25, // Retains last 25 states
			// logOnly: !isDevMode(), // Restrict extension to log-only mode
			autoPause: true, // Pauses recording actions and state changes when the extension window is not open
		  }),
		StoreModule.forRoot({}, {}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
		
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
