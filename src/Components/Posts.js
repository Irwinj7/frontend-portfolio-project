import axios from "axios";
import { useState, useEffect } from "react";
import Post from "./Post";

const API = process.env.REACT_APP_API_URL;

export default function Posts() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
      axios
      .get(`${API}/posts`)
      .then((response) => setPosts(response.data))
      .catch((c) => console.warn("catch", c));
  }, []);

  
  return (
        <div className="posts">
            {posts.map((post) => {
                return <Post key={post.id} post={post}/>
            })}
        </div>
    );

};
