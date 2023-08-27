import { useState } from "react";
import DescriptionForm from "./DescriptionForm";

function Description({ description, handleDelete, handleSubmit }) {
    const [viewEditForm, toggleEditForm] = useState(false);
   
    const toggleView = () => {
    toggleEditForm(!viewEditForm);
    };
   
    return (
    <div className="Description">
    <button onClick={toggleView}>edit this description</button>
    
    {viewEditForm ? (<DescriptionForm
    descriptionDetails={description}
    toggleView={toggleView}
    handleSubmit={handleSubmit}
    />) : 
    (
    <div>
    <h4>
    {description.title} <span>{description.author}</span>
    </h4>
    <h5>{description.price}</h5>
    <p>{description.content}</p>
    </div>)}
   
    <div>
    <h4>
    {description.title} <span>{description.author}</span>
    </h4>
    <h5>{description.price}</h5>
    <p>{description.content}</p>
    </div><button onClick={() => handleDelete(description.id)}>delete</button>
    </div>
    );
   }
  
  export default Description;