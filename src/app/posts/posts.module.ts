import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: PostsComponent }];

@NgModule({
	declarations: [PostsComponent, CreatePostComponent],
	imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PostsModule {}
