import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsModuleFeatureKey, PostsModuleState } from '.';

const getPostsModuleState = createFeatureSelector<PostsModuleState>(
	PostsModuleFeatureKey
);

const getPostsState = createSelector(
	getPostsModuleState,
	(state) => state.Posts
);

export const getPosts = createSelector(getPostsState, (state) => state.posts);
export const getLoadingStatus = createSelector(getPostsState, (state)=> state.isLoading.status);
