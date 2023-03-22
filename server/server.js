const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require("graphql");
const app = express();

// const schema = require("./schema/schema");

// dummy data
const books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return books.find((book) => book.id === args.id);
        //  code to get data from db/other source
      },
    },
  },
});

const schema = new GraphQLSchema({ query: RootQuery });

app.use(
  "/graphQl",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("server connected ..."));
