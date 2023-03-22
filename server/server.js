const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const app = express();

const schema = require("./schema/schema");

app.use(
  "/graphQl",
  graphqlHTTP({
    schema,
  })
);

app.listen(5000, () => console.log("server connected ..."));
