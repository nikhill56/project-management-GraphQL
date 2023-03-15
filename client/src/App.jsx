import { useState } from "react";
import Typography from "@mui/material/Typography";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "./App.scss";
import { Navbar, Clients } from "./components";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <div className="app">
          <Navbar />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
