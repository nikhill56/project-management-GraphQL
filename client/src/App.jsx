import { useState } from "react";
import Typography from "@mui/material/Typography";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "./App.scss";
import { Navbar, Clients, Form, Projects } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, NotFound, Project } from "./pages";

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
        <Router>
          <Navbar />
          <div className="app">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
