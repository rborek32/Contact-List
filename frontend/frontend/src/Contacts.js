import React, { useState, useEffect } from "react";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("/api/contacts")
      .then((response) => response.json())
      .then((data) => setContacts(data));
  }, []);

  return (
    <div className="container">
      <LoginPanel />
      <ContactsList contacts={contacts} />
    </div>
  );
}

function LoginPanel() {
  return (
    <div className="login-panel">
      <h2>Login Panel</h2>
      <form>
        <div>
          <label>Login:</label>
          <input type="login" name="login" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

function ContactsList({ contacts }) {
  return (
    <div className="contacts-list">
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
            <tr key={contact.id}>
              {contact.firstName} {contact.lastName}
            </tr>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
