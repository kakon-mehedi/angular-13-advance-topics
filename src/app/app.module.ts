import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/modules/material.module';

import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { FileComponent } from './file-explorer/file/file.component';
import { FolderComponent } from './file-explorer/folder/folder.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { HighlightDirective } from './star-rating/hilight.directive';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
	declarations: [
		AppComponent,
		FileExplorerComponent,
		FileComponent,
		FolderComponent,
		ProgressbarComponent,
		StarRatingComponent,
		HighlightDirective,
  CommentsComponent
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
