import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function PostEditForm() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [post, setPost] = useState({
    name: "",
    url: "",
    category: "",
    price: "",
    is_favorite: false,
  });

  const updatePost = (updatedPost) => {
    axios
      .put(`${API}/posts/${id}`, updatedPost)
      .then(
        () => {
          navigate(`/posts/${id}`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleTextChange = (event) => {
    setPost({ ...post, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setPost({ ...post, is_favorite: !post.is_favorite });
  };

  useEffect(() => {
    axios.get(`${API}/posts/${id}`).then(
      (response) => setPost(response.data),
      (error) => navigate(`/not-found`)
    );
  }, [id, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updatePost(post, id);
  };
  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={post.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Item"
          required
        />
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          pattern="http[s]*://.+"
          required
          value={post.url}
          placeholder="http://"
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={post.category}
          placeholder="Videogame, Motorcycle, Golf clubs ..."
          onChange={handleTextChange}
        />
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="text"
          name="price"
          value={post.price}
          placeholder="Name your price $!"
          onChange={handleTextChange}
        />
        <label htmlFor="is_favorite">Favorite:</label>
        <input
          id="is_favorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={post.is_favorite}
        />

        <br />

        <input type="submit" />
      </form>
      <Link to={`/posts/${id}`}>
        <button>Go Back </button>
      </Link>
    </div>
  );
}

export default PostEditForm;
