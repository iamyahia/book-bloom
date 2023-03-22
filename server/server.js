const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const app = express();

app.use("/graphQl", graphqlHTTP({}));

app.listen(5000, () => console.log("server connected ..."));
