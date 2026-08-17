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
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        My Blog
      </Link>
      <div className="navbar-links">
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
