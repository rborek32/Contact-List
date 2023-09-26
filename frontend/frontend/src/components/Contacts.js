import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginPanel from "./LoginPanel";
import ContactEditPanel from "./ContactEditPanel";
import ContactsList from "./ContactsList";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [expandedContactId, setExpandedContactId] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const refreshContacts = async () => {
    try {
      const response = await axios.get("/api/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    refreshContacts(); 
  }, []);

  return (
    //Common container for all used components
    <div className="container">
      <div className="login-and-actions">
        <LoginPanel setLoggedIn={setLoggedIn} />
        {loggedIn && (
          <ContactEditPanel
            selectedContact={selectedContact}
            refreshContacts={refreshContacts}
          />
        )}
      </div>
      <ContactsList
        contacts={contacts}
        loggedIn={loggedIn}
        expandedContactId={expandedContactId}
        setExpandedContactId={setExpandedContactId}
        setContacts={setContacts}
        setSelectedContact={setSelectedContact}
        refreshContacts={refreshContacts}
      />
    </div>
  );
}
