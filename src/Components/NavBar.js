import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <h1>
        <Link to="/posts">Posts</Link>
      </h1>
      <button>
        <Link to="/posts/new">New Post</Link>
      </button>
    </nav>
  );
}
