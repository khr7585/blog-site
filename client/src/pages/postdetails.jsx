import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/authcontext";
function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  useEffect(() => {
    api
      .get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => setError("Failed to load this post."))
      .finally(() => setLoading(false));
  }, [id]);
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete post");
    }
  };
  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;
  const isAuthor = user && post.author?._id === user._id;
  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <h1>{post.title}</h1>
      <small>
        By {post.author?.name} · {new Date(post.createdAt).toLocaleDateString()}
      </small>
      <p style={{ marginTop: "20px" }}>{post.content}</p>

      {isAuthor && (
        <div style={{ marginTop: "24px" }}>
          <button onClick={handleDelete} className="btn-danger">
            Delete Post
          </button>
        </div>
      )}
    </div>
  );
}
export default PostDetail;
