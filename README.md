# Create a REST server for managing students

- The server should handle these endpoints:
  - **GET all students** http://localhost:8080/student
  - **GET** http://localhost:8080/student/:id
  - **POST** http://localhost:8080/student
  - **PUT** http://localhost:8080/student/:id
  - **DELETE** http://localhost:8080/student/:id
- Store students in a text file
- Use Postman to test your API, import this file to Postman: ```stuffs\Students.postman_collection.json```
- If Postman doesn't work behind proxy, use [this](https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm/related?hl=en)

Express need some extra modules to read request body.  
- For [JSON body](https://www.npmjs.com/package/body-parser)

# Contact Mentor for any problem you may have
