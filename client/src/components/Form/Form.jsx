import React, { useState } from "react";
import "./Form.scss";
import Typography from "@mui/material/Typography";
import { ADD_CLIENT } from "../../mutations/ClientMutations";
import { GET_CLIENTS } from "../../queries/clientQueries";
import { useMutation } from "@apollo/client";
const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const { name, email, phone } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (name === "" || email === "" || phone === "") {
      return alert("Please enter all fields");
    }
    addClient(name, email, phone);
    setFormData({
      name: "",
      email: "",
      phone: "",
    });
  };

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  return (
    <>
      <div style={{ padding: "1rem 2rem" }}>
        <Typography variant="h5" color="initial">
          Add Client
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="app__form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              name="name"
              value={name}
              placeholder="Your email"
              onChange={handleChange}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              name="email"
              value={email}
              placeholder="Your email"
              onChange={handleChange}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="phone"
              name="phone"
              value={phone}
              placeholder="Your phone"
              onChange={handleChange}
            />
          </div>
          <button type="button" onClick={handleSubmit}>
            {loading ? "Adding" : "Add Client"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
