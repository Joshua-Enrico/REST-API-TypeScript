
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



