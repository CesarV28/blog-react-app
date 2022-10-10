import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
// import { data } from "../api/api.example"
import { trasformText } from "../helpers/trasformToHTML";
import { usePostStore } from "../hooks";

export const Home = () => {

  const { posts } = useSelector( state => state.post );

  const { startGettingPosts, startSettingCurrentPost } = usePostStore();

  useEffect(() => {

    startGettingPosts();

  }, []);
  
  const onCurrentPost = ( post ) => {
      startSettingCurrentPost( post );
  }

  return (
    <main className="home">
      <div className="home__posts">
        {posts.length !== 0 && posts.map( post => (
          <div className="post__item" key={post.id}>
            <div className="post__item-img">
              <img className="post__item-img--size" src={`${post.img}`} alt={post.title} />
            </div>
            <div className="post__item-content">
              <Link to={`/blog/post/${post.id}`}>
                <h1 onClick={() => onCurrentPost(post) } className="post__item-title">{post.title}</h1>
              </Link>

              <p className="post__item-desc">{trasformText(post.desc, 450)}</p>

              <Link to={`/blog/post/${post.id}`}>
                <button 
                  className="post__item-button"
                  onClick={() => onCurrentPost(post) }
                >
                    Read more...
                </button>
              </Link>         
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
