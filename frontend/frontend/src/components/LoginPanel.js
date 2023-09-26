import React, { useState } from "react";
import axios from "axios";

export default function LoginPanel({ setLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(
          "/api/contacts/login",
          {
            Email: email,
            Password: password,
          }
        );
  
        if (response.data && response.data.message) {
          setMessage(response.data.message);
          setLoggedIn(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setMessage("Invalid email or password.");
        } else {
          setMessage("Please try again later.");
        }
      }
    };
  
    return (
      <div className="login-panel">
        <h2>Login Panel</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    ); 
}