import * as fromPosts from './posts.reducer'

export interface PostsModuleState{
    Posts: fromPosts.PostsState
}

export const PostModuleReducers = {
    Posts: fromPosts.postsReducer
}

export const PostsModuleFeatureKey = 'PostsModuleFeatureKey'