import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { GET_PROJECT } from "../queries/projectQueries";
import { Button, Grid, Stack, Typography } from "@mui/material";
import ClientInfo from "../components/Clients/ClientInfo";
const Project = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
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
                <Stack direction="row" spacing={10}>
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
                    sx={{
                      height: "50px",
                      marginTop: "50px !important",
                      backgroundColor: "#7fe0c1",
                      color: "black",
                      fontFamily: "DM Sans",
                    }}
                  >
                    Go Back
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
