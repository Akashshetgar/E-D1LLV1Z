/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import Heading from "./Heading";
import styles from "./styles.module.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { useEffect } from "react";
import { socket } from "../../socket.js";
import { useContext } from "react";
import { OptionsContext } from "../../contexts/OptionsContext";
import { IndexContext } from "../../contexts/IndexContext";

const columnNames = [
  { label: "OI", dataKey: "oi1", numeric: true },
  { label: "CHNG IN OI", dataKey: "chngoi1", numeric: true },
  { label: "VOLUME", dataKey: "volume1", numeric: true },
  { label: "IV", dataKey: "iv1", numeric: true },
  { label: "LTP", dataKey: "ltp1", numeric: true },
  { label: "LTQ", dataKey: "ltq1", numeric: true },
  { label: "CHNG", dataKey: "chng1", numeric: true },
  { label: "BID QTY", dataKey: "bidqty1", numeric: true },
  { label: "BID PRICE", dataKey: "bidprice1", numeric: true },
  { label: "ASK QTY", dataKey: "askqty1", numeric: true },
  { label: "ASK PRICE", dataKey: "askprice1", numeric: true },
  { label: "STRIKE", dataKey: "strike", numeric: true },
  { label: "ASK PRICE", dataKey: "askprice2", numeric: true },
  { label: "ASK QTY", dataKey: "askqty2", numeric: true },
  { label: "BID PRICE", dataKey: "bidprice2", numeric: true },
  { label: "BID QTY", dataKey: "bidqty2", numeric: true },
  { label: "CHNG", dataKey: "chng2", numeric: true },
  { label: "LTQ", dataKey: "ltq2", numeric: true },
  { label: "LTP", dataKey: "ltp2", numeric: true },
  { label: "IV", dataKey: "iv2", numeric: true },
  { label: "VOLUME", dataKey: "volume2", numeric: true },
  { label: "CHNG IN OI", dataKey: "chngoi2", numeric: true },
  { label: "OI", dataKey: "oi2", numeric: true },
];

const DataTable = () => {
  const [data, setData] = React.useState([]);
  const { optionsState, setOptionsState } = useContext(OptionsContext);
  const { indexState, setIndexState } = useContext(IndexContext);

  const handleAddData = (dataArg) => {
    dataArg.map((entry, index) => {
      if (entry.type == "index") {
        setIndexState((prevState) => {
          return { ...prevState, [entry.index]: entry }; // Do something about prev LTP
        });
      } else {
        setOptionsState((prevState) => {
          console.log("PrevState", prevState);
          const strikePrice = entry.strikePrice;
          // let newEntry = {};
          // ,  [strikePrice]: {CE:{}, PE:{}}
          let temp = prevState[strikePrice];
          if (temp){
            if (entry.type == "CE") {
              temp.CE = entry;
              return {...prevState, [strikePrice]: temp};
            } else if (entry.type == "PE") {
              temp.PE = entry;
              return {...prevState, [strikePrice]: temp};
            } else {
              console.log("Err: ", entry.type);
              return {...prevState}
            }
          }else{
            if (entry.type == "CE") {
              return {...prevState, [strikePrice]: {CE: entry, PE: {}}}
            } else if (entry.type == "PE") {
              return {...prevState, [strikePrice]: {CE: {}, PE: entry}}
            } else {
              console.log("Err: ", entry.type);
              return {...prevState}
            }
          }
          // console.log(newEntry);
          
          // return { ...prevState, [strikePrice]: newEntry };
        });
      }
    });
  };

  useEffect(() => {
    socket.on("connection", () =>
      console.log("connected socket : ", socket.id)
    );

    console.log(socket.connected);
    socket.on("data", (data) => {
      if (data.length > 0) {
        handleAddData(data);
        // console.log("Received data from server:", data);
      }
    });

    socket.on("disconnect", () => console.log("disconnected socket"));

    // Clean up the socket connection when component unmounts
    // return () => {
    //   console.log("component unmounted");
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    if (data.length > 3000) {
      const sortedData = [...data].sort((a, b) => {
        return new Date(a.timeStamp) - new Date(b.timeStamp);
      });
      const newData = sortedData.slice(0, 1000);

      setData(newData);
    }
  }, [data]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* Add loop for generating TableRows and TableCells  */}
              {columnNames &&
                columnNames.map(({label}, index) => (
                  <TableCell key={index}>{label}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(optionsState) &&
              Object.keys(optionsState).map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.keys(optionsState).map((cell, index) => (
                    <TableCell key={index} component="th" scope="row">
                      {row[cell]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DataTable;
