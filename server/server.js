const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const app = express();

// const schema = require("./schema/schema");

// dummy data
const books = [
  { name: "jihanbini", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "fikri el7ad", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "zmani jihani", genre: "Fantasy", id: "1", authorId: "1" },

  { name: "why islam", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "el7ad", genre: "Fantasy", id: "2", authorId: "2" },

  { name: "fikr", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "bochy shar3", genre: "Sci-Fi", id: "3", authorId: "3" },
];

const authors = [
  { name: "yahia", age: 00, id: "1" },
  { name: "mohammed", age: 32, id: "2" },
  { name: "eissa", age: 54, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors.find((author) => author.id === parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter((book) => book.authorId === parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return books.find((book) => book.id === args.id);
        //  code to get data from db/other source
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find((author) => author.id === args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return authors;
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
