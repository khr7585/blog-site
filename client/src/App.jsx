// import { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [status, setStatus] = useState("Loading...");

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/health")
//       .then((res) => setStatus(res.data.status))
//       .catch((err) => setStatus("Backend not reachable"));
//   }, []);

//   return (
//     <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
//       <h1>{status}</h1>
//     </div>
//   );
// }

export default App;
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;