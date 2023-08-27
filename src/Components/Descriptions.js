import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Description from "./Description";
import DescriptionForm from "./DescriptionForm";

const API = process.env.REACT_APP_API_URL;

function Descriptions() {
  const [descriptions, setDescriptions] = useState([]);
  let { id } = useParams();

  const handleAdd = (newDescription) => {
    axios
      .post(`${API}/posts/${id}/descriptions`, newDescription)
      .then(
        (response) => {
          setDescriptions([response.data, ...descriptions]);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API}/posts/${id}/descriptions/${id}`)
      .then(
        (response) => {
          const copyDescriptionArray = [...descriptions];
          const indexDeletedDescription = copyDescriptionArray.findIndex((description) => {
            return description.id === id;
          });
          copyDescriptionArray.splice(indexDeletedDescription, 1);
          setDescriptions(copyDescriptionArray);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };
  const handleEdit = (updatedDescription) => {
    axios
      .put(`${API}/posts/${id}/descriptions/${updatedDescription.id}`, updatedDescription)
      .then((response) => {
        const copyDescriptionArray = [...descriptions];
        const indexUpdatedDescription = copyDescriptionArray.findIndex((description) => {
          return description.id === updatedDescription.id;
        });
        copyDescriptionArray[indexUpdatedDescription] = response.data;
        setDescriptions(copyDescriptionArray);
      })
      .catch((c) => console.warn("catch", c));
  };

  useEffect(() => {
    axios.get(`${API}/posts/${id}/descriptions`).then((response) => {
      console.log(response.data);
      setDescriptions(response.data);
    });
  }, [id, API]);
  return (
    <section className="Descriptions">
      <h2>Descriptions</h2>
      <DescriptionForm handleSubmit={handleAdd}>
        <h3>Add a New Description</h3>
      </DescriptionForm>
      {descriptions.map((description) => (
        <Description
        key={description.id}
        description={description}
        handleSubmit={handleEdit}
        handleDelete={handleDelete}
      />
      ))}
    </section>
  );
}

export default Descriptions;