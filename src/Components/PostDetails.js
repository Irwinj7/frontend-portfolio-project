import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Descriptions from "./Descriptions";

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
      <h3>
        {post.is_favorite ? <span>⭐️</span> : null} {post.name}
      </h3>
      <h5>
        <span>
          <a href={post.url}>{post.name}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {post.url}
      </h5>
      <h6>{post.category}</h6>
      <h6>{post.price}</h6>
      <p>{post.description}</p>
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
      <Descriptions />
    </article>
  )};

export default PostDetails;