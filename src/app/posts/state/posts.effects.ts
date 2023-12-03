import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../services/posts.service';
import * as PostsActions from '../state/posts.action';
import { exhaustMap, map, mergeMap } from 'rxjs';
import { Post } from './posts.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class PostsEffects {
	loadPosts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PostsActions.loadPosts),
			exhaustMap((action) => {
				return this.postsService.getPosts().pipe(
					map((data: any) => {
						console.log(data);
						this.store.dispatch(
							PostsActions.setIsLoading({ status: false })
						);
						return PostsActions.loadPostsSuccess({
							posts: data,
						});
					})
				);
			})
		);
	});

	constructor(
		private actions$: Actions,
		private postsService: PostsService,
		private store: Store
	) {}
}
