import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../queries/projectQueries";
import "./Projects.scss";
import { Grid, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard";
const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  console.log(data);
  if (loading) return <div>Loading....</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <Typography variant="h5" sx={{ padding: "1rem 2rem" }}>
        Projects
      </Typography>
      {/* {data.projects.length > 0 ? (
        <div
          className="row"
          style={{
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Typography variant="subtitle1">No Projects to display</Typography>
      )} */}
      {data.projects.length > 0 ? (
        <Grid container spacing={3} justifyContent={{ xs: "center",md:'flex-start' }} marginBottom="100px">
          {data.projects.map((project) => (
            <Grid item xs={10} md={3} lg={3}>
              <ProjectCard key={project.id} project={project} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="subtitle1">No Projects to display</Typography>
      )}
    </>
  );
};

export default Projects;
