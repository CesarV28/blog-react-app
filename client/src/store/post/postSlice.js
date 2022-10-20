

import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        curretPost: {},
        isLoading: false,
        imgPost: '',
        postStatus: 'Draft'
    },
    reducers: {
        onGetPosts: (state, { payload } ) => {
            state.posts = payload;
            state.isLoading = false;
        },
        onCreatePost: ( state, { payload }) => {
            state.postStatus = payload;
            state.isLoading = false;
        },
        onSaveImg: ( state, { payload }) => {
            state.imgPost = payload;
            state.isLoading = false;
        },
        onSetCuttentPost: ( state, { payload }) => {
            state.curretPost = payload;
        }, 
        onLoading: ( state, { payload } ) => {
            state.isLoading = payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    onGetPosts, 
    onCreatePost, 
    onSaveImg, 
    onSetCuttentPost, 
    onLoading 
} = postSlice.actions;
