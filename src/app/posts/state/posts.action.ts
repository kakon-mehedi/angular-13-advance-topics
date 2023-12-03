import { createAction, props } from '@ngrx/store';
import { create } from 'domain';
import { Post, PostsState } from './posts.reducer';

export enum PostActionType {
    FETCH_START = '[Post] Fetch Start',
    LOAD_POSTS = '[Post] Load Posts',
    POSTS_LOADED_SUCCESS = '[Posts] Posts Load Success',
    ADD_POST = '[Post] Add Post',
    SET_LOADING = '[Post] Set Loading'
}

export const loadPosts = createAction(PostActionType.LOAD_POSTS);
export const loadPostsSuccess = createAction(PostActionType.POSTS_LOADED_SUCCESS, props<{posts: Array<Post>}>())
export const addPost = createAction(PostActionType.ADD_POST, props<Post>());
export const setIsLoading = createAction(PostActionType.SET_LOADING, props<{status: boolean}>())
