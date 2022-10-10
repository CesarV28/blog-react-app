import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Menu } from "../components"
import { trasformText } from "../helpers/trasformToHTML";
import { usePostStore } from "../hooks";

export const Single = () => {

  const { curretPost } = useSelector( state => state.post );

  const { id, title, desc, img, date, user, category } = curretPost;

  const {startSettingCurrentPost} = usePostStore();  

  const description = trasformText(desc).split('.');

  return (
    <div className="single">
      <div className="content">
        <img className="content__img" src={ img } alt={ title } />
        <div className="content__user">
          <img className="content__user-img" src="https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/computer-user-icon.png" alt={'user image'} />
          <div className="content__user-info">
            <span className="content__user-name">{ user?.username}</span>
            <p className="content__user-published">{ date }</p>
          </div>
          <div className="content__user-edit">
            <Link 
              className="content__user-edit--edit" 
              to={`/blog/write/${id}`}
              onClick={() => startSettingCurrentPost({ ...curretPost })}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
            <Link className="content__user-edit--delete"><i className="fa-solid fa-trash"></i></Link>
          </div>
        </div>
        
        <div className="content__info">
          <h1 className="content__info-title">{ title }</h1>
          <p>
            {description}
          </p>
        </div>
        
      </div>

      <main>
        <Menu category={ category } id={ id }/>
      </main>
    </div>
  )
}
