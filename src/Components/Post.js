import { Link } from "react-router-dom";

export default function Post({ post }) {
  console.log(post)
  return (
    <div className="post">
            <Link to={`/posts/${post.id}`}><img src={post.url} alt={post.name}/></Link>
            <p className="label"><span className="bold">Favorite:</span> {post.is_favorite ? (
                <span>⭐</span>
            ) : (
                <span>✩</span>
            )}</p>
            <p className="label"><span className="bold">Item:</span> {post.name}</p>
            <p className="label"><span className="bold">Category:</span> {post.category}</p>
        </div>
)};