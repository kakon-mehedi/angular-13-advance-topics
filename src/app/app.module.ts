import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './concepts/components/hello-world/hello-world.component';
import { MaterialModule } from './shared/modules/material.module';
import { IndepthModule } from './indepth/indepth.module';

@NgModule({
	declarations: [AppComponent, HelloWorldComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MaterialModule,
		BrowserAnimationsModule,
		IndepthModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
