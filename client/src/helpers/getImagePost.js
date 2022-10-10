import blogApi from "../api/blogApi"


export const getImagePost = async() => {
    const { data } = await blogApi.get('/upload/post/13');
    return data;
}
