# This Covered In this Lesson

- Basics of Express
- Routing in express
- Advanced Routing In Express

# Videos to go through

- [Express Crash Course](https://www.youtube.com/watch?v=SccSCuHhOw0)
- [Middleware Basics Course](https://www.youtube.com/watch?v=lY6icfhap2o)
- [Prisma tutorial](https://youtu.be/RebA5J-rlwg)
- [PostgresSQl](https://youtu.be/fZQI7nBu32M)

# Prerequities

- [Lesson One Node Basics git repo ](https://github.com/kolynzb/node-shop-api-trial)
- [Node Crash Course](https://www.youtube.com/watch?v=TlB_eWDSMt4&t=552s)

- Move to Lesson on branch `L2-prisma-node`

# Resources
- [Postgres cheat sheet](https://postgrescheatsheet.com/#/tables)
- [Postgres cheat sheet](https://quickref.me/postgres)
- [Erd Diagram](https://drawsql.app/teams/kolynz/diagrams/kcf-trials)
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

```json
  "prisma": {
    "schema": "src/prisma/schema.prisma"
  },
```

- You run `npx prisma format`

- Replace Database url with

```bash
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<dbname>?schema=public"
```

- The first code block is know as the configuration for the generatos which is what will help to convert your prisma code using the prisma client.Their different genrators like graphql generator

```prisma
generator client {
  provider = "prisma-client-js" // default genrator
}
```

- Then the next Code Block is the Data Source Code Block that defines the type of databse engine your using as well as the Database URL

```prisma
datasource db {
  provider = "postgresql" // where data is comming from
  url      = env("DATABASE_URL") // defined in environment variables
}
```

- Create A schema.

```prisma
model User {
  id Int @id @unique @default(autoincrement()) // all schemas must include a unique id
  name String
}
```

- Create a migration._Note: that the prisma schema is separate from the database, so we need to tell prisma to convert the prisma code to SQL_
  `npx prisma migrate <envronment> --name <name>`
  - _or_
    `npx prisma migrate <envronment>`
  - _or_
    `npx prisma migrate dev --name init`
- This will also create a prisma client which you will use to access data from the database. So every time you make a migration it will update your client for you.

- Install client add the client that allows you to generate and use the client in application
  `yarn add @prisma/client`

- if you want to regenerate client._This will go ahead and genrate the client based on our provider_
  `npx prisma generate`

- To use the client import the code given to you in the CLI and paste it into your ts file.

```ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // this is where we shall call our prisma client
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect(); // disconnect after running queries
  });

export default prisma;
```

- To access the schema we can use the prisma client.

```ts
prisma.user.findMany(); // Get all the users
//prisma.<schema_name>.<query_method>
prisma.user.create({ data: { name: "Kolynz" } });
```

## Fields

- To declare a field, start with a _name_ then the _type_ (_these are required_) then you can also add a field Type modifier (_optional_). _Like `?` to indicate that its optional or `[]` to indicate that is an array of objects_
- You can also attributes like `@unique`

```prisma
model User {
  id String @id @unique @default(uuid())
  name String? // Optional name field
  email String
  isActive Boolean // Boolean
  transactions BigInt  // Big integer larger than an int
  preferences Json // Store Json .. SUPPORTED BY POSTGRES AND NOT SQLite
  blob Bytes // for file data or big data stored in bytes
  posts Post[] // Data that represents another Object
  accountBalance Float // more genral floating point
  networth Decimal // If you want to e more accurate with your floating point numbers.
  created_at DateTime  //data based field
  updated_at DateTime
}

model Post{
  id String @id @unique @default(uuid()) // uuid field
  author User @relation(fields: [authorId], references:[id])
  authorId String
}
```

### Relationships

- **One to many relationship**.
- Lets create a one to many relationship where one user can have many posts.

```prisma
model User {
  id String @id @unique @default(uuid())
  email String
  posts Post[] // post data

}

model Post{
  id String @id @unique @default(uuid()) // uuid fields This are safer the autoincremented IDs
  author User @relation(fields: [authorId], references:[id])
  authorId String // references the id field in the User Model (Foreign Key)
}
```

- **Two References to a single Field in a one to many relationship**
- Assuming we had a two fields with a one to many relation ship with the user for intance a saved posts field and a written posts field.

```prisma
model User {
  id String @id @unique @default(uuid())
  email String
  writtenPosts Post[]  @relation("WrittenPosts")
  bookmarkedPosts Post[] @relation("BookmarkedPosts")

}

model Post{
  id String @id @unique @default(uuid()) // uuid field
  author User @relation("WrittenPosts",fields: [authorId], references:[id])
  authorId String
  bookmarkedBy User @relation("BookmarkedPosts",fields: [bookmarkedById], references:[id])
  bookmarkedById String
}
```

- **Many To Many Relationship**
- For instance a post can have many categories and viceversa.

```prisma
model Post{
  id String @id @unique @default(uuid()) // uuid field
  categories PostCategory[]
}

model PostCategory{
  id String @id  @default(uuid())
  posts Post[]
}
```

- This will create join tables for us to emulate the relationsip

- **One To One Relationship**
- Lets assume a user has a one set of preferences.

```prisma
model User {
  id String @id @unique @default(uuid())
  email String
  userPreference UserPreference? @relation(fields: [userPreferenceId], references:[id])
  userPreferenceId String? @unique // only one reference to user
}

model UserPreference {
  id String @id @default(uuid())
  emailUpdates Boolean //Designated wether a user wants to receive emails.
  user User

}
```

## More Attributes

- `@unique` - deesignates weather a field is unique
- `@updatedAt` - deesignates that this field should be populated with a data when updated
- `@default` - sets a default value for the field

```prisma
model User {
  id String @id  @default(uuid())
  email String @unique
  created_at DateTime  @default(now())
  updated_at DateTime @updatedAt
}
```

- **Block Level Attributes**
- Field lEvel Attribute Applies To a Field and as a single `@` symbol.
- Block level attributes are written on a new line with `@@` as aprefix
- For instance we add a constraint to our database where user must have a unique email and name combination.

```prisma
model User {
  id String @id  @default(uuid())
  age Int
  email String @unique
  @@unique{[email,age]} // block level attribute
}

```

- You also add indexing (_For faster searches by a field_).

```prisma
model User {
  id String @id  @default(uuid())
  email String @unique
  @@index{[email]} // block level attribute
}

```

- We can also create a composite ID (_Id formed form two attributes_)

```prisma
model Post{
  title String
  author User @relation("WrittenPosts",fields: [authorId], references:[id])
  authorId String
  @@id{[authorId,title]}
}

```

### Enums

- If you wanted to make a set of acceptable values.

```prisma
model User {
  id String @id  @default(uuid())
  email String @unique
  role Role @default(BASIC)
}

enum Role {
BASIC
ADMIN
EDITOR
}
```

- Dont Forget to migrate

### Using the Prisma Client

- Lets talk CRUD
- _Note: You should use one instance of the PrismaClient to prevent having too many conccurent connections to the database_

- **Create**
- Simple Create Functionality

```ts
const user = await prisma.user.create({
  data: {
    // Pass Data here as dictionary attributes.
  },
});
```

- Creating with data for related tables.

```ts
const user = await prisma.user.create({
  data: {
    name:"Kolynz"
    userPreference:{
      create:{
        // pass data for related table
      }
    }
  },
});
```

- If you want Properties for the created related table return then you ca add the include attribute.

```ts
const user = await prisma.user.create({
  data: {
    name:"Kolynz"
    userPreference:{
      create:{
        emailUpdate:true,
      }
    }
  },
  include:{
    userPreferennce: true, // to include userPreference to the returned Object
  }
});
```

- INsted of using `include` we can use `select` which can be used to specify the fields you want.
- You can specify that you only want the name of user returned

```ts
select: {
  name: true;
}
```

- You can also specify the feilds you want from a related table.

```ts
select: {
  name: true;
  userPreference: {
    select: {
      id: true;
    }
  }
}
```

- You can only have a either `select` or `include` but not both.

- **Create Many **

```ts
prisma.user.CreateMany({
  data: [
    {
      name: "Kolynz",
    },
    {
      name: "Benda",
    },
  ],
});
```

- You cannot use select here

- **Read**
- We can use the `findUnique` method that can get use an object that has a unique attribute that matches what we pass
- This returns one and you can pass select and include

```ts
const user = await prisma.user.findUnique({
  where: {
    email: "example.com",
  },
});
```

- You can use `findFirst` which will get you the first object that matches the query.
- You can use `findMany` which will get you all the objects that matches the query.
- A few more things to note about `where`
- Finding distinct fields and pagination.

```ts
const user = await prisma.user.findMany({
  where: {
    name: "Josh",
  },
  disttnct: ["field"], // returns object with this a distinct attribute.
  take: 2, // limits results to 2
  skip: 1, // skips one
  orderBy: {
    age: "asc", // "desc"
  },
});
```

- Using Equals query

```ts
const user = await prisma.user.findMany({
  where: {
    name: { equals: "example.com" }, // This will do the same
  },
});
```

- To get a user that is not "Kolynz"

```ts
where: {
    name:{ not:"Kolynz",}  // This will do the same
},
```

- To get all users whose name exists in an array

```ts
where: {
    name:{ in:["Kolynz","James"],}  // This get all the
},
```

- To get all users whose name doesnot exists in an array

```ts
where: {
    name:{ notin:["Kolynz","James"],},  // This get all the
    age:{lt:20} //age less than 20 ,gt,gte,lte
},
```

- Queries on contains._Checks if a field contain a particuler text_.For instance if an email contains test.com

```ts
where: {
   name: { contains: "@test.com" },
},
```

- You can also be more specific with `endsWith`
- You can combine queries using `AND`,`OR`,`NOT`

```ts
where: {
  AND:[
   {email: { startsWith: "jeff" }},
   {email: { endsWith: "@test" }},
  ]
},
```

- Queries on relationships.
- Get all queries that match this attribute.

```ts
where: {
   userPreferences: { emailUpdates: true },
},
```

- You can get Allobjects whose related objects match something . You can use `every`,`some` . You can also nest the previous covered queries inside here.

```ts
where: {
   writtenPosts: { every: {
    title: "Test",
   } },
},
```

- Relationship Filtering using `is` and `isNot`

```
const post = await prisma.post.findMany({
 where: {
   author:{
     is: {
       age:27
     }
   }
 }
})
```

- **Update**
- `update` - Updates the first user it finds
- `updateMany` - Will Update All that match the query

```ts
const updatedUser = await prisma.user.update({
  where: {
    email: "collinsb@gmail.com", // must be a unique field
  },
  data: {
    email: "colo@gmail.com",
  },
});
```

- Updates on numerical values are abit unique

```ts
const updatedUser = await prisma.user.update({
  where: {
    email: "collinsb@gmail.com", // must be a unique field
  },
  data: {
    age: {
      increment: 1, // decrement,multiply,divide
    },
  },
});
```

- Dealing with a related field that already has a reference.For instance updating UserPreference field that alread has a user.

- I can create a Preference

```ts
const prefernece = await prisma.userPreference.create({
  data: {
    emailUpdates: true,
  },
});
```

- Then assign it to th user

```ts
const updatedUser = await prisma.user.update({
  where: {
    email: "collinsb@gmail.com", // must be a unique field
  },
  data: {
    userPrefernces: {
      connect: {
        id: "id_string_from_the_previous_query",
      }, // decrement,multiply,divide
    },
  },
});
```

- You can also disconnect existing objects using `disconnect` this is also avalable when creating.

- **Delete**
- `prisma.<table>.deleteMany()` - delete all
- `prisma.<table>.delete()` - works very similar to find

### Display queries

- To show what code prisma is run while it makes a query you can modify the client.
  `const prisma = new PrismaClient({log:["query"]})`
- This will log every query that is run.
- _This is useful if you want to debug or pay attention to performance_

```

```
