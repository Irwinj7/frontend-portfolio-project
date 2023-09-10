import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Offers from "./Offers";

const API = process.env.REACT_APP_API_URL;

function PostDetails() {
  const [post, setPost] = useState([]);
  let navigate = useNavigate();
  let { id } = useParams();
  
  useEffect(() => {
    axios
    .get(`${API}/posts/${id}`)
    .then((response) => {
      setPost(response.data);
    })
    .catch((c) => {
      console.warn("catch", c);
    });
  }, [id, navigate, API]);
  
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

    const handleDelete = () => {
      deletePost()
    };
    
    
  return (
<>
      <div className="show">
        <img src={post.url} alt={post.name} />
        <p className="label">
          <span className="bold">Favorite:</span>{" "}
          {post.is_favorite ? <span>⭐</span> : <span>✩</span>}
        </p>

        <p className="label">
          <span className="bold">Item:</span> {post.name}
        </p>
        <p className="label">
          <span className="bold">Category:</span> {post.category}
        </p>
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
        <Offers />
      </div>
    </>
  )};

export default PostDetails;