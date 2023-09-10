import { useState } from "react";
import OfferForm from "./OfferForm";

function Offer({ offer, handleDelete, handleSubmit }) {
    const [viewEditForm, toggleEditForm] = useState(false);
   
    const toggleView = () => {
    toggleEditForm(!viewEditForm);
    };
   
    return (
    <div className="Offers">
    <button onClick={toggleView}>Edit this offers</button>
    
    {viewEditForm ? (<OfferForm
    offersDetails={offer}
    toggleView={toggleView}
    handleSubmit={handleSubmit}
    />) : 
    (
    <div>
    <h4>
    {offer.title} <span>{offer.author}</span>
    </h4>
    <h5>{offer.price}</h5>
    <p>{offer.content}</p>
    </div>)}
    <button onClick={() => handleDelete(offer.id)}>delete</button>
    </div>
    );
   }
  
  export default Offer;