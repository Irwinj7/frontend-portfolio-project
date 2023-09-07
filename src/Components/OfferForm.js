import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function OfferForm(props) {
  let { id } = useParams();
  const { offerDetails } = props;

  const [offer, setOffer] = useState({
    author: "",
    title: "",
    content: "",
    price: "",
    post_id: id,
  });

  const handleTextChange = (event) => {
    setOffer({ ...offer, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    if (offerDetails) {
      setOffer(offerDetails);
    }
  }, [id, offerDetails, props]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(offer, id);
    if (offerDetails) {
      props.toggleView();
    }
    setOffer({
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
          value={offer.author}
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
          value={offer.title}
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
          value={offer.price}
          onChange={handleTextChange}
        />
        <label htmlFor="content">Offer:</label>
        <textarea
          id="content"
          type="text"
          name="content"
          value={offer.content}
          placeholder="What are you listing?"
          onChange={handleTextChange}
        />

        <br />

        <input type="submit" />
      </form>
    </div>
  );
}

export default OfferForm;