import * as React from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export function ServiceRequestDisplay(props: {
  allRequestForm: {
    requestID: number;
    name: string;
    priority: string;
    location: string;
    requestType: string;
    status: string;
  };
  onUpdateStatus: (newStatus: string) => void;
}) {
  // const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   props.onUpdateStatus(event.target.value);
  // };
  return (
    <TableRow>
      <StyledTableCell>{props.allRequestForm.requestID}</StyledTableCell>
      <StyledTableCell>{props.allRequestForm.name}</StyledTableCell>
      <StyledTableCell align="right">
        {props.allRequestForm.priority}
      </StyledTableCell>
      <StyledTableCell align="right">
        {props.allRequestForm.location}
      </StyledTableCell>
      <StyledTableCell align="right">
        {props.allRequestForm.requestType}
      </StyledTableCell>
      <StyledTableCell align="right">
        {props.allRequestForm.status}
      </StyledTableCell>
    </TableRow>
  );
}
