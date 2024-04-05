//import * as React from 'react';\
import styles from './NodeDataPage.module.css';
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export interface NodeRow {
  id: string;
  xcoord: number;
  ycoord: number;
  longName: string;
}

const NodeDataPage: React.FC = () => {
  const [rows, setRows] = useState<NodeRow[]>([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/nodes");

      console.log(res.data);
      console.log("successfully got data from get request");
      setRows(res.data);
    }
    fetchData().then();
  }, []);
  console.log(rows);
  return (
      <div className={styles.outerDiv}>
              <div className={styles.nodeCSV}>
                  <h2>Import / Export Nodes</h2>
                  <div className={styles.Butt}>
                      <div className={styles.ospacer}></div>
                      <Button
                          className={styles.ufileButton}
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon/>}
                          style={{
                              backgroundColor: "#003b9c",
                              fontFamily: "Poppins",
                              fontSize: 14,
                              textAlign: "center",
                          }}>Import Nodes<VisuallyHiddenInput type="file"/>
                      </Button>
                      <div className={styles.spacer}></div>
                      <Button
                          className={styles.dfileButton}
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudDownloadIcon/>}
                          style={{
                              backgroundColor: "#003b9c",
                              fontFamily: "Poppins",
                              fontSize: 14,
                              textAlign: "center",
                          }}>Export Nodes<VisuallyHiddenInput type="file"/>
                      </Button>
                      <div className={styles.ospacer}></div>
                  </div>
              </div>

          <div className={styles.tableDiv}>
              <TableContainer component={Paper} style={{marginTop: "75px"}}>
                  <Table sx={{minWidth: 650}} aria-label="simple table">
                      <TableHead>
                          <TableRow>
                              <TableCell>nodeID(key)</TableCell>
                              <TableCell align="center">xcoord</TableCell>
                              <TableCell align="center">ycoord</TableCell>
                              <TableCell align="center">longName</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {rows.map((row) => (
                              <TableRow
                                  key={row.id}
                                  sx={{"&:last-child td, &:last-child th": {border: 0}}}
                              >
                                  <TableCell align="right">{row.id}</TableCell>
                                  <TableCell align="right">{row.xcoord}</TableCell>
                                  <TableCell align="right">{row.ycoord}</TableCell>
                                  <TableCell align="right">{row.longName}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
          </div>
      </div>
  );
};

export default NodeDataPage;
