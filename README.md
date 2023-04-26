# authentication-node-js

# Authentication Node Js API

This repository contains a Node.js API project built using [Express](https://expressjs.com/) framework.

## Project Setup

To run this project, follow these steps:

1. Clone this repository to your local machine.
2. Install Node.js and npm if you haven't already.
3. Install project dependencies by running `npm install`.
4. Create a `.env` file based on the `.env.example` file, and set the required environment variables.
5. Start the application by running `npm run dev`.

## Project Structure

The project structure is as follows:

```
├── src/
|   |-- app.ts
|   |-- middleware
|    |   |-- authenticated.middleware.ts
|    |   |-- error.middleware.ts
|    |   |-- validation.middleware.ts
|    |-- resources
|    |   |-- post
|    |   |   |-- post.controller.ts
|    |   |   |-- post.interface.ts
|    |   |   |-- post.model.ts
|    |   |   |-- post.service.ts
|    |   |   |-- post.validation.ts
|    |   |-- user
|    |   |   |-- user.controller.ts
|    |   |   |-- user.interface.ts
|    |   |   |-- user.model.ts
|    |   |   |-- user.service.ts
|    |   |   |-- user.validation.ts
|    |-- utils
|    |   |-- definations
|    |   |   |-- custom.d.ts
|    |   |-- exceptions
|    |   |   |-- http.exceptions.ts
|    |   |-- interfaces
|    |   |   |-- controller.interfaces.ts
|    |   |   |-- token.interface.ts
|    |   |-- token.ts
|    |   |-- validateEnv.ts
├── .env.example              # Example environment variables
├── index.js                    # Express application
└── package.json
|-- tsconfig.json
|-- .eslintrc.js
|-- .gitignore
|-- .prettierrc.js
```


## API Endpoints

The following endpoints are available:

- `GET /api/users`: Returns a JSON response of the user information.
- `POST /api/users/login`: Returns a token for the authorization.
- `POST /api/users/register`: Register user.
- `POST /api/posts`: Register posts into the MongoDB.
## Environment Variables

The following environment variables are required:

- `PORT`: The port number that the API should listen on.
- `MONGO_PATH`: Path of the MongoDB Atlas or Local Compas.
- `MONGO_USER`: Username of MongoDb.
- `MONGO_PASSWORD`: Password of MongoDb.



## Contributing

Feel free to contribute to this project by submitting pull requests or opening issues.

## License

This project is licensed under the [MIT License](LICENSE).