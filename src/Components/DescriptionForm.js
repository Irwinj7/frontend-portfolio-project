import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DescriptionForm(props) {
  let { id } = useParams();
  const { descriptionDetails } = props;

  const [description, setDescription] = useState({
    author: "",
    title: "",
    content: "",
    price: "",
    post_id: id,
  });

  const handleTextChange = (event) => {
    setDescription({ ...description, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    if (descriptionDetails) {
      setDescription(descriptionDetails);
    }
  }, [id, descriptionDetails, props]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(description, id);
    if (descriptionDetails) {
      props.toggleView();
    }
    setDescription({
      author: "",
      title: "",
      content: "",
      price: "",
      post_id: id,
    });
  };
  return (
    <div className="Edit">
      {props.children}
      <form onSubmit={handleSubmit}>
        <label htmlFor="author">Name:</label>
        <input
          id="author"
          value={description.author}
          type="text"
          onChange={handleTextChange}
          placeholder="Your name"
          required
        />
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          required
          value={description.title}
          onChange={handleTextChange}
        />
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          name="price"
          min="0"
          max="1000000"
          step="1"
          value={description.price}
          onChange={handleTextChange}
        />
        <label htmlFor="content">Description:</label>
        <textarea
          id="content"
          type="text"
          name="content"
          value={description.content}
          placeholder="What are you listing?"
          onChange={handleTextChange}
        />

        <br />

        <input type="submit" />
      </form>
    </div>
  );
}

export default DescriptionForm;