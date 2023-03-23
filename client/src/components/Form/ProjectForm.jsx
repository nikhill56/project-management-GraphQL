import React, { useState } from "react";
import "./Form.scss";
import Typography from "@mui/material/Typography";
import { GET_PROJECTS } from "../../queries/projectQueries";
import { GET_CLIENTS } from "../../queries/clientQueries";
import { useMutation, useQuery } from "@apollo/client";
import { FaList } from "react-icons/fa";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import { ADD_PROJECT } from "../../mutations/ProjectMutations";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "new",
    clientId: "",
  });
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [isLoading, setisLoading] = useState(false);
  const { name, description, status, clientId } = formData;

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });
  if (loading)
    return (
      <ClipLoader loading={loading} size={150} aria-label="Loading Spinner" />
    );
  if (error) return <div>Error....</div>;

  console.log(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please enter all fields");
    }
    // addClient(name, description, status);
    console.log(name, description, status, clientId);
    addProject(name, description, status, clientId);
    setisLoading(false);
    setFormData({
      name: "",
      description: "",
      status: "new",
      clientId: "",
    });
  };

  return (
    <>
      <div style={{ padding: "1rem 2rem" }}>
        <Typography variant="h5" color="initial">
          New Project
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
              placeholder="Your name"
              onChange={handleChange}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              name="description"
              value={description}
              placeholder="Your description"
              onChange={handleChange}
            />
          </div>
          <Select
            variant="outlined"
            labelId="Not Started"
            name="status"
            value={status}
            color="info"
            displayEmpty
            required
            defaultValue="Not Started"
            onChange={handleChange}
            sx={{
              fontFamily: "DM Sans",
              fontWeight: "200",
              fontSize: "14px",
              color: "gray",
            }}
            className="app__project-form"
          >
            <MenuItem
              value="new"
              sx={{
                fontFamily: "DM Sans",
                fontWeight: "200",
                fontSize: "14px",
                color: "gray",
              }}
            >
              Not Started
            </MenuItem>
            <MenuItem
              value="progress"
              sx={{
                fontFamily: "DM Sans",
                fontWeight: "200",
                fontSize: "14px",
                color: "gray",
              }}
            >
              In Progress
            </MenuItem>
            <MenuItem
              value="completed"
              sx={{
                fontFamily: "DM Sans",
                fontWeight: "200",
                fontSize: "14px",
                color: "gray",
              }}
            >
              Completed
            </MenuItem>
          </Select>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Select Client</InputLabel>
            <Select
              variant="outlined"
              labelId="Client"
              name="clientId"
              value={clientId}
              color="info"
              label="Select Client"
              required
              defaultValue="Select Client"
              onChange={handleChange}
              sx={{
                fontFamily: "DM Sans",
                fontWeight: "200",
                fontSize: "14px",
                color: "gray",
              }}
              className="app__project-form"
            >
              <MenuItem
                value=""
                sx={{
                  fontFamily: "DM Sans",
                  fontWeight: "200",
                  fontSize: "14px",
                  color: "gray",
                }}
              >
                Select Client
              </MenuItem>
              {data.clients.map((client) => (
                <MenuItem
                  key={client.id}
                  value={client.id}
                  sx={{
                    fontFamily: "DM Sans",
                    fontWeight: "200",
                    fontSize: "14px",
                    color: "gray",
                  }}
                >
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <div className="app__flex">
            <input
              className="p-text"
              type="phone"
              name="status"
              value={status}
              placeholder="Your status"
              onChange={handleChange}
            />
          </div> */}
          <button type="button" onClick={handleSubmit}>
            {isLoading ? "Adding" : "Add Project"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectForm;
