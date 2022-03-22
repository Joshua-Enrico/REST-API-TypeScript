
# API REST - TypeScript and Prisma

This is simple Example of an API rest build on Node.js with TypeScript.

Why TypeScript?, Take a look [Link](https://www.typescriptlang.org/why-create-typescript)




## Tecnologies and tools Used

 - [Prisma](https://www.prisma.io/docs/concepts/components/prisma-client)- ORM for SQL and NoSQL databases
 - [Prisma-Client](https://www.prisma.io/docs/concepts/components/prisma-client) - An auto-generated and type-safe query builder that's tailored to your data
 - [Node.js](https://github.com/matiassingers/awesome-readme) - My second home
 - [JWT](https://www.npmjs.com/package/jsonwebtoken) - JSON Web Token for node.js
 - [TypeScript](https://www.typescriptlang.org) - A strongly typed programming language that builds on JavaScript
 - [Express.js](https://expressjs.com/es/) - Most used JavaScript framework for backend aplications
 - [morgan](https://www.npmjs.com/package/morgan) - A HTTP request logger middleware for Node. js
 - [crypto-js](https://www.npmjs.com/package/crypto-js) - JavaScript library of crypto standards.
 - [MariaDb](https://mariadb.org/) SQL Database
 - [cors](https://www.npmjs.com/package/cors) - Shorthand for Cross-Origin Resource Sharing


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` Server Port

`DATABASE_URL` DB url

`SALT` Secret for password encryption

`JWT_SECRET` JWT secret






## Deployment

There are to Steps, if you want to test in  a dev enviroment to the next

```bash
  npm run dev
```

In case you want to run on production run:
```bash
  npm run build 
```
and 
```bash
  npm run start
```
"build" complies TypseScript code to JavaScript code, finally "start" runs node with JavaScript Code



## API Reference

#### Create User

```http
  POST /api/auth/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. new username |
| `email` | `string` | **Required**. new user email|
| `password` | `string` | **Required**. new user password |
| `firstName` | `string` | **Required**. new user firstName |
| `lastName` | `string` | **Required**. new user lastName |

#### Signed User

```http
  POST /api/auth/signin
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. user email |
| `password`      | `string` | **Required**. user password |

#### Create Post

```http
  POST /api/post/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. post title |
| `content`      | `string` | **Required**. post content |
| `authorId`      | `string` | **Required**. author ID |




## Files

#### Main files


| Files     | Description                |
| :------- | :------------------------- |
| [dist](./dist) | Compiled JavaScript code |
| [prisma](./prisma) | Prisma schema and sql history |
| [src](./src) | Typescript modules |
| [package.json](./package.json) | Node.js configurations |
| [tsconfig.ts](./tsconfig.ts) | Typescript configurations |


#### SRC files


| Files     | Description                |
| :------- | :------------------------- |
| [config](./src/config) | Load Env variables  |
| [controllers](./src/config) | All endpoitns controllers |
| [models](./src/models) | moongose models , not being used, replaced for prisma |
| [routes](./src/routes) | All endpoints routes |
| [services](./src/services) | All kind of services like queries, validations |
| [app.ts](./src/app.ts) | Express file configuration |
| [database.ts](./src/database.ts) | Moongose connections , not being used |
| [index.ts](./src/index.ts) | Init app |  


## Authors

- [@Joshua Enrico](https://github.com/Joshua-Enrico)
