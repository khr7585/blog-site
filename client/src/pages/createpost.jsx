import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/authcontext";

function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Please log in to create a post.
      </p>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validate = () => {
    if (formData.title.trim().length < 3) {
      return "Title must be at least 3 characters";
    }
    if (formData.content.trim().length < 10) {
      return "Content must be at least 10 characters";
    }
    return "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const res = await api.post("/posts", formData);
      navigate(`/post/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h2>Create New Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px" }}
        />
        <br />
        <br />
        <textarea
          name="content"
          placeholder="Write your post..."
          value={formData.content}
          onChange={handleChange}
          required
          rows={8}
          style={{ width: "100%", padding: "8px" }}
        />
        <br />
        <br />
        <input
          name="category"
          placeholder="Category (optional)"
          value={formData.category}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
        <br />
        <br />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default CreatePost;
