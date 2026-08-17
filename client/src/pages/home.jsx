import { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => setPosts(res.data))
      .catch(() => setError("Failed to load posts. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="status-message">Loading posts...</p>;
  if (error) return <p className="status-message error-text">{error}</p>;

  return (
    <div className="page-container">
      <h1>Latest Posts</h1>
      {posts.length === 0 ? (
        <p className="status-message">
          No posts yet. Be the first to write one!
        </p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}

export default Home;
