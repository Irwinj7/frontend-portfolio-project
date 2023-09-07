import axios from "axios";
import { useState, useEffect } from "react";
import Post from "./Post";

const API = process.env.REACT_APP_API_URL;

function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/posts`)
      .then((response) => setPosts(response.data))
      .catch((c) => console.warn("catch", c));
  }, []);
  return (
    <div className="Posts">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this post</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              return <Post post={post} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Posts;
