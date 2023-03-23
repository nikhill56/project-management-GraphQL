import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { GET_PROJECT } from "../queries/projectQueries";
import {
  Button,
  Grid,
  Stack,
  Typography,
  Modal,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import ClientInfo from "../components/Clients/ClientInfo";
import { GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT, UPDATE_PROJECT } from "../mutations/ProjectMutations";

import { FaArrowAltCircleLeft } from "react-icons/fa";
import "../components/Form/Form.scss";
const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "new",
    clientId: "",
  });
  const { name, description, status } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id } }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please enter all fields");
    }

    // console.log(name, description, status);
    updateProject(name, description, status);
    setFormData({
      name: "",
      description: "",
      status: "new",
    });
  };
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: id },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  if (error) return <div>Error....</div>;
  if (loading)
    return (
      <ClipLoader loading={loading} size={150} aria-label="Loading Spinner" />
    );
  console.log(data);

  return (
    <>
      {!loading && !error && (
        <div className="">
          <Grid container justifyContent="center" mt={10}>
            <Grid
              item
              xs={10}
              p={2}
              md={6}
              sx={{
                // border: "2px solid black",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "500px",
                  padding: "30px",
                }}
                className="app__project-card"
              >
                <Stack direction="row" spacing={2}>
                  <Stack>
                    <Typography variant="h3" sx={{ fontFamily: "DM Sans" }}>
                      {data.project.name}
                    </Typography>
                    <Typography variant="h5" sx={{ fontFamily: "DM Sans" }}>
                      {data.project.description}
                    </Typography>
                    <Stack mt={5}>
                      <Typography
                        variant="h5"
                        fontWeight={600}
                        sx={{ fontFamily: "DM Sans" }}
                      >
                        Project Status
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          color:
                            data.project.status === "Not Started"
                              ? "red"
                              : "green",
                          fontFamily: "DM Sans",
                        }}
                      >
                        {data.project.status}
                      </Typography>
                    </Stack>
                    <ClientInfo client={data.project.client} />
                  </Stack>
                  <Button
                    component={Link}
                    to="/"
                    sx={{
                      height: "50px",
                      marginTop: "50px !important",
                      backgroundColor: "white",
                      color: "black",
                      fontFamily: "DM Sans",
                      width: "10%",
                    }}
                  >
                    <FaArrowAltCircleLeft style={{ fontSize: "20px" }} />
                  </Button>
                  <Button
                    onClick={handleOpen}
                    sx={{
                      height: "50px",
                      marginTop: "50px !important",
                      backgroundColor: "#7fe0c1",
                      color: "white",
                      fontFamily: "DM Sans",
                      width: "30%",
                    }}
                  >
                    Edit
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <div className="">
                      <Grid container justifyContent="center" mt={10}>
                        <Grid
                          item
                          xs={10}
                          p={2}
                          md={6}
                          sx={{
                            // border: "2px solid black",
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "500px",
                              padding: "30px",
                            }}
                            className="app__project-card"
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
                              <Button
                                onClick={handleSubmit}
                                sx={{
                                  height: "50px",
                                  marginTop: "10px !important",
                                  color: "white",
                                  fontFamily: "DM Sans",
                                  width: "50%",
                                }}
                              >
                                Submit
                              </Button>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Modal>
                  <Button
                    component={Link}
                    onClick={deleteProject}
                    to="/"
                    sx={{
                      height: "50px",
                      marginTop: "50px !important",
                      backgroundColor: "red",
                      color: "white",
                      fontFamily: "DM Sans",
                      width: "30%",
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Project;
