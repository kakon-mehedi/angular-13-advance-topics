import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./todos/todos.module').then((m) => m.TodosModule),
		canActivate: [],
	},

	{
		path: 'posts',
		loadChildren: () =>
			import('./posts/posts.module').then((m) => m.PostsModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
