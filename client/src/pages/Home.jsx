import React from "react";
import { Navbar, Clients, Form, Projects, ProjectForm } from "../components";
const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Clients />
      <Form />
      <ProjectForm />
      <Projects />
    </>
  );
};

export default Home;
