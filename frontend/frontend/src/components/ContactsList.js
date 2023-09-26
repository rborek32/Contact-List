import React from "react";
import axios from "axios";

export default function ContactsList({
  contacts,
  loggedIn,
  expandedContactId,
  setExpandedContactId,
  setSelectedContact,
  refreshContacts 
}) {
  
    const moveInfo = (contact) => {
        setSelectedContact(contact);
      };
    
      const handleDelete = async (email) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
          try {
            await axios.delete(`/api/contacts?email=${email}`);
            refreshContacts(); 
        
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
                    <button onClick={() => setExpandedContactId(
                          expandedContactId === contact.id ? null : contact.id
                        )}>
                      {expandedContactId === contact.id? "Hide Details" : "Show Details"}
                    </button>
                  )}
                </div>{" "}
                
                {expandedContactId === contact.id && loggedIn && (
                  <div className="contact-details">
                    <p>First name: {contact.firstName}</p>
                    <p>Last Name: {contact.lastName}</p>
                    <p>Email: {contact.email}</p>
                    <p>Category: {contact.category}</p>
                    <p>Phone Number: {contact.phoneNumber}</p>
                    <p>Date of birth: {contact.dateOfBirth}</p>
                    <button onClick={() => moveInfo(contact)}> Move details </button>
                    <button onClick={() => handleDelete(contact.email)}> Delete Contact </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
    )
}