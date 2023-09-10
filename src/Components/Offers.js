import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Offer from "./Offer";
import OfferForm from "./OfferForm";

const API = process.env.REACT_APP_API_URL;

function Offers() {
  const [offers, setOffers] = useState([]);
  let { id } = useParams();

  const handleAdd = (newOffer) => {
    axios
      .post(`${API}/posts/${id}/offers`, newOffer)
      .then(
        (response) => {
          setOffers([response.data, ...offers]);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API}/posts/${id}/offers/${id}`)
      .then(
        (response) => {
          const copyOfferArray = [...offers];
          const indexDeletedOffer = copyOfferArray.findIndex((offer) => {
            return offer.id === id;
          });
          copyOfferArray.splice(indexDeletedOffer, 1);
          setOffers(copyOfferArray);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };
  const handleEdit = (updatedOffer) => {
    axios
      .put(`${API}/posts/${id}/offers/${updatedOffer.id}`, updatedOffer)
      .then((response) => {
        const copyOfferArray = [...offers];
        const indexUpdatedOffer = copyOfferArray.findIndex((offer) => {
          return offer.id === updatedOffer.id;
        });
        copyOfferArray[indexUpdatedOffer] = response.data;
        setOffers(copyOfferArray);
      })
      .catch((c) => console.warn("catch", c));
  };

  useEffect(() => {
    console.log("offers URL")
    console.log(`${API}/posts/${id}/offers`)
    axios.get(`${API}/posts/${id}/offers`).then((response) => {
      console.log(response.data);
      setOffers(response.data);
    });
  }, [id, API]);
  return (
    <section className="Offers">
      <h2>Offers</h2>
      <OfferForm handleSubmit={handleAdd}>
        <h3>Add a New Offer</h3>
      </OfferForm>
      {offers.map((offer) => (
        <Offer
        key={offer.id}
        offer={offer}
        handleSubmit={handleEdit}
        handleDelete={handleDelete}
      />
      ))}
    </section>
  );
}

export default Offers;