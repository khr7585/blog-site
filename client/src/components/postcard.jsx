import { Link } from "react-router-dom";
function PostCard({ post }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "16px", marginBottom: "16px", borderRadius: "8px" }}>
      <h3><Link to={`/post/${post._id}`}>{post.title}</Link></h3>
      <p>{post.content.slice(0, 120)}...</p>
      <small>By {post.author?.name || "Unknown"} · {new Date(post.createdAt).toLocaleDateString()}</small>
    </div>
  );
}
export default PostCard;