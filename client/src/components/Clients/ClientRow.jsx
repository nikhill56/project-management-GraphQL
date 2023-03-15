import React from "react";
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
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../../mutations/ClientMutations";
import { GET_CLIENTS } from "../../queries/clientQueries";
const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {client.name}
      </TableCell>
      <TableCell>{client.email}</TableCell>
      <TableCell>{client.phone}</TableCell>
      <TableCell>
        <button
          style={{ border: "none", cursor: "pointer" }}
          onClick={deleteClient}
        >
          <FaTrash
            style={{
              fontSize: "30px",
              border: "none",
              color: "rgba(236, 62, 62)",
            }}
          />
        </button>
      </TableCell>
    </TableRow>
  );
};

export default ClientRow;
