import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './concepts/components/hello-world/hello-world.component';
import { MaterialModule } from './shared/modules/material.module';
import { RxjsOperatorsAtAGlanceComponent } from './concepts/components/rxjs-operators-at-a-glance/rxjs-operators-at-a-glance.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		HelloWorldComponent,
		RxjsOperatorsAtAGlanceComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MaterialModule,
		BrowserAnimationsModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
