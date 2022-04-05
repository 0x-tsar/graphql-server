const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    year: Int
    users: [User!]!
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

const users = [
  {
    _id: String(Math.random()),
    name: "name1",
    email: "email1",
    active: true,
  },
  {
    _id: String(Math.random()),
    name: "name2",
    email: "email2",
    active: false,
  },
  {
    _id: String(Math.random()),
    name: "name3",
    email: "email3",
    active: true,
  },
];

const resolvers = {
  Query: {
    hello: () => "Hello World",
    year: () => fn(),
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((user) => user.email === args.email);
    },
  },

  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true,
      };

      users.push(newUser);
      return newUser;
    },
  },
};

const fn = () => {
  return 777;
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`server started at:${url}`));
