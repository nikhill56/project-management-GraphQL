import "./Clients.scss";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { GET_CLIENTS } from "../../queries/clientQueries";
import ClipLoader from "react-spinners/ClipLoader";
import ClientRow from "./ClientRow";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  console.log(data);

 

  if (error) return <div>Error....</div>;
  if (loading)
    return (
      <ClipLoader loading={loading} size={150} aria-label="Loading Spinner" />
    );
  return (
    <div className="app__clients">
      <Typography variant="h5" color="initial">
        Clients
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Clients;
