
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { usePostStore } from '../hooks';
// import { data } from '../api/api.example'

export const Menu = ({ category, id }) => {

  const { posts } = useSelector( state => state.post);
  const { startSettingCurrentPost } = usePostStore();

  const postFilterCategory = posts.filter( post => (post.category === category && post.id !== id) );

    const onCurrentPost = ( post ) => {
      startSettingCurrentPost( post );
  }

  return (
    <div className="menu">
        <h1 className="menu__title">Other post you may like</h1>
        <div className="menu__list">
            { postFilterCategory.length !== 0 && postFilterCategory.map( post => (
                <div key={post.id} className="list__item">
                    <img className="list__item-img" src={post.img} alt={`${post.title} image`} />
                    <h2 className="list__item-title">{post.title}</h2>
                    <Link to={`/blog/post/${post.id}`}>
                      <button 
                        className="list__item-button"
                        onClick={() => onCurrentPost(post)}
                      >
                          Read more...
                      </button>
                    </Link>
                    
                </div>
            ))}
        </div>
    </div>
  )
}
