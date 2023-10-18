const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");

const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

//load any files that have graphql extension
const typesArray = loadFilesSync("**/*", {
  extensions: ["graphql"],
});

//load resolvers
const resolversArray = loadFilesSync("**/*", {
  extensions: ["resolvers.js"],
});

//build schema
const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

const app = express();

//server graphiql interface
app.get("/graphql", (req, res) => {
  res.sendFile(__dirname + "/graphiql.html");
});

app.use("/graphql", createHandler({ schema }));

app.listen(3000, () => {
  console.log("graphql server runs at port 3000...");
});
