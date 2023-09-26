import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ContactEditPanel({ selectedContact, refreshContacts }) { 
    const [firstName, setFirstName] = useState(selectedContact ? selectedContact.firstName : "");
    const [lastName, setLastName] = useState(selectedContact ? selectedContact.lastName : "");
    const [email, setEmail] = useState(selectedContact ? selectedContact.email : "");
    const [password, setPassword] = useState(selectedContact ? selectedContact.passowrd : "");
    const [category, setCategory] = useState(selectedContact ? selectedContact.category : "");
    const [subCategory, setSubcategory] = useState(selectedContact ? selectedContact.subCategory : "");
    const [phoneNumber, setPhoneNumber] = useState(selectedContact ? selectedContact.phoneNumber : "");
    const [dateOfBirth, setDateOfBirth] = useState(selectedContact ? selectedContact.dateOfBirth : "");
  
    useEffect(() => {
      if (selectedContact) {
        setFirstName(selectedContact.firstName);
        setLastName(selectedContact.lastName);
        setEmail(selectedContact.email);
        setPassword(selectedContact.setPassword);
        setCategory(selectedContact.category);
        setSubcategory(selectedContact.subCategory);
        setPhoneNumber(selectedContact.phoneNumber);
        setDateOfBirth(formatDate(selectedContact.dateOfBirth));
      }
    }, [selectedContact]);
  
    const addContact = async () => {
      try {
        const response = await axios.post('/api/contacts', {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          category: category,
          subCategory: subCategory,
          phoneNumber: phoneNumber,
          dateOfBirth: new Date(dateOfBirth).toISOString()
        });
  
        if (response.status === 200) {
          console.log("Contact added successfully!");
        } else {
          console.error("Error adding the contact:", response);
        }
        refreshContacts(); 

      } catch (error) {
        console.error("Error adding the contact:", error);
      }
    };
    
    const updateContact = async () => {
      try {
        const response = await axios.put('/api/contacts', {
          id: selectedContact.id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          category: category,
          subCategory: subCategory,
          phoneNumber: phoneNumber,
          dateOfBirth: new Date(dateOfBirth).toISOString()
        });
  
        if (response.status === 200) {
          console.log("Contact updated successfully!");
        } else {
          console.error("Error updating the contact:", response);
        }
        refreshContacts();
      } catch (error) {
        console.error("Error updating the contact:", error);
      }
    };
  
    return (
      <div className="login-panel">
        <h2>Add or Update Contact</h2>
        <div className="input-wrapper">
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
  
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
  
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
  
          <label>Password</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
  
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Służbowy">Służbowy</option>
            <option value="Prywatny">Prywatny</option>
            <option value="Inny">Inny</option>
          </select>  

            { category !== "Prywatny" && <label>Subcategory</label> }
            {category === "Służbowy" ? (
                <select value={subCategory} onChange={(e) => setSubcategory(e.target.value)}>
                    <option value="szef">szef</option>
                    <option value="klient">klient</option>
                </select>
            ) : category === "Inny" ? (
                <input type="text" value={subCategory} onChange={(e) => setSubcategory(e.target.value)} placeholder="Enter subcategory" />
            ) : null}

          <label>Phone Number</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
  
          <label>Date of birth</label>
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
  
        </div>
        <div className="button-group">
          <button onClick={addContact}>Add Contact</button>
        </div>
  
        <div className="button-group">
          <button onClick={updateContact}>Update Contact</button>
        </div>
      </div>
    );
}

function formatDate(isoString) {
    const date = new Date(isoString);
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

  return [year, month, day].join('-');
}