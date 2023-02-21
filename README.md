# This Covered In this Lesson

- Basics of Express
- Routing in express
- Advanced Routing In Express

# Videos to go through

- [Express Crash Course](https://www.youtube.com/watch?v=SccSCuHhOw0)
- [Middleware Basics Course](https://www.youtube.com/watch?v=lY6icfhap2o)
- [Prisma tutorial](https://youtu.be/RebA5J-rlwg)

# Prerequities

- [Lesson One Node Basics git repo ](https://github.com/kolynzb/node-shop-api-trial)
- [Node Crash Course](https://www.youtube.com/watch?v=TlB_eWDSMt4&t=552s)

- Move to Lesson on branch L2-prisma-node

# Lesson 2

- install Prisma CLI
- Install Prisma
  ` yarn add -D prisma`
- Initialize prisma
  `npx prisma init`
- you can also specify the database
  `npx prisma init --datasource-provider postgresql`
- For code formatting and highlighting add [prisma extention](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- Enable Autosave in Vscode settings.
- Move into src folder and add this to package.json [file](: https://www.prisma.io/docs/concepts/components/prisma-schema#prisma-schema-file-location)

```.json
  "prisma": {
    "schema": "src/prisma/schema.prisma"
  },
```

- Replace Database url with

```.env

DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<dbname>?schema=public"
```