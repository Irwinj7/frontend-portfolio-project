import { Link } from "react-router-dom";

function Post({ post }) {
  return (
    <tr>
      <td>
        {post.is_favorite ? (
          <span>⭐️</span>
        ) : (
          <span>&nbsp; &nbsp; &nbsp;</span>
        )}
      </td>
      <td>
        <a href={post.url} target="_blank" rel="noreferrer">
          {post.name}
        </a>
      </td>
      <td>
        <Link to={`/posts/${post.id}`}>✏️</Link>
      </td>
    </tr>
  );
}

export default Post;
