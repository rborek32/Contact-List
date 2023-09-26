# Web application supporting the contact list.

View for not signed in user
![image](https://github.com/rborek32/NetPC/assets/92055063/31606066-d873-4ba6-b08b-b7eab615497a)

You can login as admin or a person from contact list.

When signed in it is possible to expand contacts and Edit panel shows up.
At the page load there's a request to backend for the list of records.
Passwords are stored hashed in mongoDB.
![image](https://github.com/rborek32/NetPC/assets/92055063/c279d1e2-311d-43fb-bc23-98ee7ff18544)

When clicked Move details then they appear in the inputs of edit panel. 
![image](https://github.com/rborek32/NetPC/assets/92055063/e4ac8c5a-a940-40eb-8e7d-536a6b8d1d97)

If we would like to add contact with the same email as already existing then the backend reponds with message: "Email address already exists." as it is visible above.

It is also not possible to change user email to already existing one.

Backend endpoints: (http://localhost:9000/swagger/index.html)
![image](https://github.com/rborek32/NetPC/assets/92055063/45aaff65-94fd-4f58-b74e-efd966534dee)

GET /api/contacts - returns list of contacts

POST /api/contacts - adds contact to the DB

PUT /api/contacts - updates existing contact 

DELETE /api/contacts - deletes contact 

POST /api/contacts/login - checks if there is a contact with provided credentials, if not then returns unauthorized 
{
  "email": "string",
  "password": "string"
}

To start the frontend download modules "npm i" and start using "npm run". Run backend with http Launch
