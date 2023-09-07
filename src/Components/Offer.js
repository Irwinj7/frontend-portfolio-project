import { useState } from "react";
import OfferForm from "./OfferForm";

function Offer({ offers, handleDelete, handleSubmit }) {
    const [viewEditForm, toggleEditForm] = useState(false);
   
    const toggleView = () => {
    toggleEditForm(!viewEditForm);
    };
   
    return (
    <div className="Offers">
    <button onClick={toggleView}>edit this offers</button>
    
    {viewEditForm ? (<OfferForm
    offersDetails={offers}
    toggleView={toggleView}
    handleSubmit={handleSubmit}
    />) : 
    (
    <div>
    <h4>
    {offers.title} <span>{offers.author}</span>
    </h4>
    <h5>{offers.price}</h5>
    <p>{offers.content}</p>
    </div>)}
   
    <div>
    <h4>
    {offers.title} <span>{offers.author}</span>
    </h4>
    <h5>{offers.price}</h5>
    <p>{offers.content}</p>
    </div><button onClick={() => handleDelete(offers.id)}>delete</button>
    </div>
    );
   }
  
  export default Offer;