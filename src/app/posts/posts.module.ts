import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { PostModuleReducers, PostsModuleFeatureKey } from './state';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './state/posts.effects';
import { MaterialModule } from '../shared/modules/material.module';

const routes: Routes = [{ path: '', component: PostsComponent }];

@NgModule({
	declarations: [PostsComponent, CreatePostComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		StoreModule.forFeature(PostsModuleFeatureKey, PostModuleReducers),
		EffectsModule.forFeature([PostsEffects]),
		MaterialModule
	],
})
export class PostsModule {}
