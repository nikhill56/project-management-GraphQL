import { Card, CardContent, Stack, Typography, Box } from "@mui/material";
import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <Card
      sx={{
        maxWidth: "330px",
        padding: "10px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
        },
        cursor: "pointer",
        textDecoration: "none",
        bgcolor: "#11142d",
        marginLeft: "30px",
      }}
      elevation={0}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "10px",
          paddingX: "5px",
        }}
      >
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#fff">
            {project.name}
          </Typography>
          <Typography fontSize={14} color="#808191">
            {project.description}
          </Typography>
          <Typography
            fontSize={14}
            // color="#FFBF00"
            sx={{
              color: project.status === "In Progress" ? "green" : "#FFBF00",
            }}
          >
            <span style={{ color: "white" }}>Status</span>:{" "}
            <strong>{project.status}</strong>
          </Typography>
          {/* <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Typography fontSize={14} color="#808191">
              {project.description}
            </Typography>
          </Stack> */}
          <button className="app__project">
            <a href={`/projects/${project.id}`}>View</a>
          </button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
