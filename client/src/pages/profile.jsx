import { useAuth } from "../context/authcontext";

function Profile() {
  const { user } = useAuth();

  if (!user)
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>Please log in.</p>
    );

  return (
    <div className="page-container">
      <h2>Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
}

export default Profile;
