import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogApi from "../api/blogApi";
import { fileUpload } from "../helpers/fileUpload";
import { getImagePost } from "../helpers/getImagePost";

import { 
    onGetPots, 
    onSaveImg, 
    onCreatePost, 
    onSetCuttentPost, 
    onLoading 
} from "../store";


export const usePostStore = () => {

    const { 
        posts,
        curretPost,
        isLoading,
        imgPost, 
        postStatus
    } = useSelector( state => state.post );

    const dispatch = useDispatch();

    const startGettingPosts = async(  ) => {
        try {
            
            dispatch( onLoading(true) );
            const { data } = await blogApi.get('/posts');
            // await getImagePost()
            const { posts } = data;
            dispatch( onGetPots( posts ) );
        } catch (error) {
            console.log(error);
            dispatch( onLoading(true) );
        }
    }

    const startUploadingFile = async( file ) => {
        dispatch( onLoading(true) );
        const { img } = await fileUpload(file);
        dispatch( onSaveImg(img) );
    }

    const startCreatingPost = async( postData = {} ) => {

        const { title, desc, category, id } = postData;

        try {   
            dispatch( onLoading(true) );
            if( id ){
                await blogApi.put(`/posts/${id}`, { title, desc, category, img: imgPost });
                dispatch( onCreatePost('updated'));
                return;
            }

            await blogApi.post(`/posts`, { title, desc, category, img: imgPost });
            dispatch( onCreatePost('saved'));

        } catch (error) {
            console.log(error.response.data);
            dispatch( onLoading(true) );
        }
    }

    const startSettingCurrentPost = ( post ) => {
        dispatch(onSetCuttentPost(post))
    }


    return {

        startGettingPosts,
        startCreatingPost,
        startUploadingFile,
        startSettingCurrentPost
     }
}
