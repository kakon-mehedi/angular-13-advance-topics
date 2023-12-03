import { Component, OnInit } from '@angular/core';
import { Post } from '../../state/posts.reducer';
import { Store } from '@ngrx/store';
import * as PostsActions from '../../state/posts.action';
import { getLoadingStatus, getPosts } from '../../state/posts.selectors';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
	posts$: Observable<Post[]> = this.store.select(getPosts);
	isLoading: Observable<boolean> = this.store.select(getLoadingStatus);

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.getPosts();
	}

	getPosts() {
		this.store.dispatch(PostsActions.setIsLoading({ status: true }));
		this.store.dispatch(PostsActions.loadPosts());
	}
}
