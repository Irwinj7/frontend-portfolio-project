import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Offers from "./Offers";

const API = process.env.REACT_APP_API_URL;



function PostDetails() {
  const [post, setPost] = useState([]);
  let navigate = useNavigate();
  let { id } = useParams();

  const handleDelete = () => {
    deletePost()
  };

  const deletePost = () => {
    axios
      .delete(`${API}/posts/${id}`)
      .then(
        () => {
          navigate(`/posts`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  useEffect(() => {
    axios
      .get(`${API}/posts/${id}`)
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((c) => {
        console.warn("catch", c);
      });
  }, [id, API]);

  return (
    <article>
      <h1>
        {post.is_favorite ? <span>⭐️</span> : null} <a href={post.url}>{post.name}</a>
      </h1>
      <h1>${post.price}</h1>
      <h3>{post.category}</h3>
      <p>{post.offer}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/posts`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          <Link to={`/posts/${id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {/* <Offers /> */}
    </article>
  )};

export default PostDetails;