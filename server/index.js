const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db.js");

const port = process.env.PORT || 5000;
const app = express();

connectDB();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: "",
    graphiql: process.env.NODE_ENV === "development",
  })
);
app.listen(port, console.log(`Started server on ${port}`.green.bold));
