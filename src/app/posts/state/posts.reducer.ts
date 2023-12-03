import { createReducer, on, props } from '@ngrx/store';

import * as postActions from './posts.action'

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string
}

export interface PostsState {
    posts: Post[];
    isLoading: {
        status: boolean
    }

    isLoading2: boolean
}

const INITIAL_STATE: PostsState = {
    posts: [],
    isLoading: {status: false},
    isLoading2: false
}

export const postsReducer = createReducer(
    INITIAL_STATE, 

    on(postActions.setIsLoading, (state, action)=>{
        return {
            ...state,
            isLoading: {
                status: action.status
            }
        }
    }),

    on(postActions.loadPostsSuccess, (state, action)=>{
        return {
            ...state,
            posts: action.posts
        }
    }),

    on(postActions.addPost, (state, action)=>{
        return {
            ...state,
            posts: [...state.posts, action]
        }
    })
)