import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "16px", borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ fontWeight: "bold", fontSize: "20px" }}>My Blog</Link>
      <div style={{ display: "flex", gap: "16px" }}>
        {user ? (
          <>
            <Link to="/create">New Post</Link>
            <Link to="/profile">{user.name}</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;