import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function PostNewForm() {
  let navigate = useNavigate();

  const addPost = (newPost) => {
    axios
      .post(`${API}/posts`, newPost)
      .then(
        () => {
          navigate(`/posts`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const [post, setPost] = useState({
    name: "",
    url: "",
    category: "",
    price: "",
    is_favorite: false,
  });

  const handleTextChange = (event) => {
    setPost({ ...post, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setPost({ ...post, is_favorite: !post.is_favorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPost(post);
  };
  return (
    <div className="New">
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
          type="number"
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
    </div>
  );
}

export default PostNewForm;
