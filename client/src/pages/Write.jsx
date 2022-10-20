
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { data } from '../api/api.example';
import { trasformText } from '../helpers/trasformToHTML';
import { useAuthStore, useForm, usePostStore } from '../hooks';

export const Write = () => {

  const { status } = useSelector( state => state.auth );
  const { startLogout } = useAuthStore();

  if(status === 'not-authenticated'){
    startLogout(' Sorry, you need to login or create an account ');
    return <Navigate to={'/auth/login'}/>
  }

  const { startCreatingPost, startUploadingFile } = usePostStore();
  const { postStatus, curretPost, isLoading } = useSelector( state => state.post );

  const params = useParams();

  const { title, desc, category } = curretPost;

  const description = trasformText(desc);

  const [value, setValue] = useState( description );

  const [img, setImg] = useState('');

  const { formState, onInputChange } = useForm({
    title: title ?? '',
    desc: description ?? '',
    category: category && '',
    file: ''
  });  

  const onUpdate = () => {

    startCreatingPost({ 
        title: formState.title,
        desc: value.toString(),
        category: formState.category,
        img,
        id: params.id 
     });
    
  }

  const uploadImgChange = ({ target }) => {
      if( target?.files === 0 ) return;

      setImg(startUploadingFile( target.files ));
  }

  return (
    <div className="add">
      <div className="content">
        <input 
          className="content__input" 
          type="text" 
          placeholder='Title'
          name='title'
          value={ formState.title }
          onChange={ onInputChange }
        />
        <div className="content__editor">
          <ReactQuill 
            className="content__editor-editor" 
            theme="snow" 
            value={ value } 
            onChange={setValue} 
          />
        </div>
      </div>
      <div className="menu">
          <div className="menu__item">
            <h2 className="menu__item-title">Publish</h2>
            <span>
              <b>Status:</b> {postStatus}
            </span>
            <span>
              <b>Visibility</b> Public
            </span>

            <input 
              style={{ display: 'none' }} 
              type="file" 
              id='file' 
              name='file'
              onChange={ uploadImgChange }
            />
            <label className="menu__item-upload" htmlFor="file">Upload img <i className="fa-solid fa-arrow-up-from-bracket"></i></label>
            <div className="menu__item-buttons">
              <button className="menu__item-buttons--save">Save as a Draf</button>
              <button disabled={isLoading} onClick={ onUpdate }  className="menu__item-buttons--upload">Update</button>
            </div>
          </div>
          <div className="menu__item">

            <h2 className="menu__item-title">Category</h2>
            {data.length !== 0 && data.map( PostCategory => (
              <div className="menu__item-radio" key={PostCategory.id}>
                <input 
                  type="radio" 
                  name='category' 
                  value={ PostCategory.title} 
                  id={ PostCategory.id}
                  onChange={ onInputChange }
                  checked={ PostCategory.title === category ? true : false }
                />
                <label htmlFor={PostCategory.title}>{PostCategory.title}</label>
              </div>
            ))}
          </div>
      </div>
    </div>
  )
}
