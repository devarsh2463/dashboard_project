import { useState } from "react";

function EditUser({ user, onUserUpdated, onClose }) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");
  const [password, setPassword] = useState(user.password || "");

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/updateUser/" + user._id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            address,
            password,
          }),
        }
      );

      const data = await response.json();
      

      console.log("Update Response:", data);

      if (response.ok) {
        alert("User updated successfully!");

        onUserUpdated();
      } else {
        alert(
          data.errorMessage ||
            data.message ||
            "Unable to update user"
        );
      }
    } catch (error) {
      console.log("Update Error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="modal-overlay">

      <div className="add-user-modal">

        <div className="add-user-header">
          <h2>Edit User</h2>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleUpdateUser}>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Address</label>

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Update User
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditUser;