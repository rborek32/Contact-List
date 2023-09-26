import React, { useState, useEffect } from "react";
import axios from "axios";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [expandedContactId, setExpandedContactId] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetch("/api/contacts")
      .then((response) => response.json())
      .then((data) => setContacts(data));
  }, []);

  return (
    <div className="container">
      <div className="login-and-actions">
        <LoginPanel setLoggedIn={setLoggedIn} />
        {loggedIn && <ContactEditPanel selectedContact={selectedContact} />}
      </div>
      <ContactsList
        contacts={contacts}
        loggedIn={loggedIn}
        expandedContactId={expandedContactId}
        setExpandedContactId={setExpandedContactId}
        setContacts={setContacts}
        setSelectedContact={setSelectedContact}
      />
    </div>
  );
}

function LoginPanel({ setLoggedIn }) {
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

function ContactsList({
  contacts,
  loggedIn,
  expandedContactId,
  setExpandedContactId,
  setContacts,
  setSelectedContact
}) {

  const moveInfo = (contact) => {
    setSelectedContact(contact);
  };

  const handleDelete = async (email) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(`/api/contacts?email=${email}`);
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.email !== email)
        );
      } catch (error) {
        console.error("Error deleting the contact:", error);
      }
    }
  };

  return (
    <div className="contacts-list">
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            <div className="contact-header">
              {" "}
              { }
              <span>
                {contact.firstName} {contact.lastName}
              </span>
              {loggedIn && (
                <button
                  onClick={() =>
                    setExpandedContactId(
                      expandedContactId === contact.id ? null : contact.id
                    )
                  }
                >
                  {expandedContactId === contact.id
                    ? "Hide Details"
                    : "Show Details"}
                </button>
              )}
            </div>{" "}
            { }
            {expandedContactId === contact.id && loggedIn && (
              <div className="contact-details">
                <p>First name: {contact.firstName}</p>
                <p>Last Name: {contact.lastName}</p>
                <p>Email: {contact.email}</p>
                <p>Category: {contact.category}</p>
                <p>Phone Number: {contact.phoneNumber}</p>
                <p>Date of birth: {contact.dateOfBirth}</p>
                <button onClick={() => moveInfo(contact)}> Move details </button>
                <button onClick={() => handleDelete(contact.email)}>
                  {" "}
                  Delete Contact{" "}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactEditPanel({ selectedContact }) {

  const [firstName, setFirstName] = useState(selectedContact ? selectedContact.firstName : "");
  const [lastName, setLastName] = useState(selectedContact ? selectedContact.lastName : "");
  const [email, setEmail] = useState(selectedContact ? selectedContact.email : "");
  const [category, setCategory] = useState(selectedContact ? selectedContact.category : "");
  const [phoneNumber, setPhoneNumber] = useState(selectedContact ? selectedContact.phoneNumber : "");
  const [dateOfBirth, setDateOfBirth] = useState(selectedContact ? selectedContact.dateOfBirth : "");

  useEffect(() => {
    if (selectedContact) {
      setFirstName(selectedContact.firstName);
      setLastName(selectedContact.lastName);
      setEmail(selectedContact.email);
      setCategory(selectedContact.category);
      setPhoneNumber(selectedContact.phoneNumber);
      setDateOfBirth(formatDate(selectedContact.dateOfBirth));
    }
  }, [selectedContact]);

  const updateContact = async () => {
    try {
      const response = await axios.put('/api/contacts', {
        id: selectedContact.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: selectedContact.password,
        category: category,
        subCategory: selectedContact.subCategory,
        phoneNumber: phoneNumber,
        dateOfBirth: new Date(dateOfBirth).toISOString()
      });

      if (response.status === 200) {
        console.log("Contact updated successfully!");
      } else {
        console.error("Error updating the contact:", response);
      }
    } catch (error) {
      console.error("Error updating the contact:", error);
    }
  };

  return (
    <div className="login-panel">
      <h2>Update Contact</h2>
      <div className="input-wrapper">
        <label>First Name</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

        <label>Last Name</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

        <label>Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Category</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />

        <label>Phone Number</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

        <label>Date of birth</label>
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

      </div>
      <div className="button-group">
        <button onClick={updateContact}>Update Contact</button>
      </div>
    </div>
  );
}

function formatDate(isoString) {
  const date = new Date(isoString);
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

export default Contacts;