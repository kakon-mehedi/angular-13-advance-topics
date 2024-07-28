import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyComponent } from './app.component';

@NgModule({
	declarations: [MyComponent],
	imports: [BrowserModule, BrowserAnimationsModule],
	providers: [],
	bootstrap: [MyComponent],
})
export class MyModule {}
