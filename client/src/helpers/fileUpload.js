import blogApi from "../api/blogApi";

 
 export const fileUpload = async( file ) => {

    console.log(file)
    const img = new FormData();
    img.append('fileName', file[0]);
    
    try {
        const { data } = await blogApi.post('/upload', img);

        return {
            img: data
        }

    } catch (error) {
        console.log(error.response?.data)
    }

 }
 