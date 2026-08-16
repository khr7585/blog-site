import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <h1>{post.title}</h1>
      <small>By {post.author?.name} · {new Date(post.createdAt).toLocaleDateString()}</small>
      <p style={{ marginTop: "20px" }}>{post.content}</p>
    </div>
  );
}
export default PostDetail;