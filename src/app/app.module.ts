import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/modules/material.module';
import { TodosModule } from './todos/todos.module';
import { PostsModule } from './posts/posts.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MaterialModule,
		BrowserAnimationsModule,
		StoreModule.forRoot({}, {}),
		EffectsModule.forRoot([]),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
