# jwt-authentication

NodeJS Express Project Showcasing login and signup features, validation using Joi, and JWT for authentication of routes.


## Project Structure
```.
├── index.js
├── middlewares
│   └── validation.js
├── model
│   └── user.js
├── package.json
├── README.md
└── routes
    ├── auth.js
    ├── posts.js
    └── verifyToken.js
```

## For running the project

### Using yarn 
```
yarn install 
yarn start
```
### Using npm

```
npm install 
npm start
```

### Routes 

  /api/v1/user/register

    Payload:

    {
    "name":"Your Name",
    "email": "youremail@yourmail.com",
    "password":"yourpassword"
    }
   
 /api/v1/user/login

    Payload:
    
    {
    "email": "youremail@yourmail.com",
    "password":"yourpassword"
    }
  
 /api/v1/posts
 
    Get Request, with auth-token in header
   
   
