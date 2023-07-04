/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
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
import CustomTableRow from "./CustomTableRow";

const columnNames = [
  { label: "OI", dataKey: "OI", isCE: true },
  { label: "CHNG IN OI", dataKey: "chngOI", isCE: true },
  { label: "VOLUME", dataKey: "volume", isCE: true },
  { label: "IV", dataKey: "IV", isCE: true },
  { label: "LTP", dataKey: "LTP", isCE: true },
  { label: "LTQ", dataKey: "LTQ", isCE: true },
  { label: "CHNG", dataKey: "chng", isCE: true },
  { label: "BID QTY", dataKey: "bidQty", isCE: true },
  { label: "BID PRICE", dataKey: "bidPrice", isCE: true },
  { label: "ASK QTY", dataKey: "askQuantity", isCE: true },
  { label: "ASK PRICE", dataKey: "askPrice", isCE: true },
  { label: "STRIKE", dataKey: "strikePrice" },
  { label: "ASK PRICE", dataKey: "askPrice", isCE: false },
  { label: "ASK QTY", dataKey: "askQuantity", isCE: false },
  { label: "BID PRICE", dataKey: "bidPrice", isCE: false },
  { label: "BID QTY", dataKey: "bidQty", isCE: false },
  { label: "CHNG", dataKey: "chng", isCE: false },
  { label: "LTQ", dataKey: "LTQ", isCE: false },
  { label: "LTP", dataKey: "LTP", isCE: false },
  { label: "IV", dataKey: "IV", isCE: false },
  { label: "VOLUME", dataKey: "volume", isCE: false },
  { label: "CHNG IN OI", dataKey: "chngOI", isCE: false },
  { label: "OI", dataKey: "OI", isCE: false },
];

const DataTable = () => {
  const [data, setData] = React.useState([]);
  const { optionsState, setOptionsState } = useContext(OptionsContext);
  const { indexState, setIndexState } = useContext(IndexContext);

  const handleAddData = (dataArg) => {
    // console.log(optionsState);
    dataArg.map((entry, index) => {
      if (entry.type == "index") {
        setIndexState((prevState) => {
          return { ...prevState, [entry.index]: entry }; // Do something about prev LTP
        });
      } else {
        setOptionsState((prevState) => {
          // console.log("PrevState", prevState);
          const strikePrice = entry.strikePrice;
          // let newEntry = {};
          // ,  [strikePrice]: {CE:{}, PE:{}}
          let temp = prevState[strikePrice];
          if (temp) {
            if (entry.type == "CE") {
              temp.CE = entry;
              return { ...prevState, [strikePrice]: temp };
            } else if (entry.type == "PE") {
              temp.PE = entry;
              return { ...prevState, [strikePrice]: temp };
            } else {
              console.log("Err: ", entry.type);
              return { ...prevState };
            }
          } else {
            if (entry.type == "CE") {
              return { ...prevState, [strikePrice]: { CE: entry, PE: {} } };
            } else if (entry.type == "PE") {
              return { ...prevState, [strikePrice]: { CE: {}, PE: entry } };
            } else {
              console.log("Err: ", entry.type);
              return { ...prevState };
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

    const onData = (data) => {
      if (data.length > 0) {
        handleAddData(data);
        // console.log("Received data from server:", data);
      }
    };

    console.log(socket.connected);
    socket.on("data", onData);

    socket.on("disconnect", () => console.log("disconnected socket"));

    // Clean up the socket connection when component unmounts
    return () => {
      console.log("component unmounted");
      socket.off("data", onData);
    };
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
          <TableRow>
            <TableCell
              variant="head"
              align="center"
              style={{
                width: 20,
                backgroundColor: "black",
                color: "whitesmoke",
              }}
              sx={{
                backgroundColor: "grey.300",
                fontSize: 11,
                fontWeight: "bold",
              }}
              colSpan={12}
            >
              CALL
            </TableCell>
            <TableCell
              variant="head"
              align="center"
              style={{
                width: 20,
                backgroundColor: "black",
                color: "whitesmoke",
              }}
              sx={{
                backgroundColor: "grey.300",
                fontSize: 11,
                fontWeight: "bold",
              }}
              colSpan={12}
            >
              PUT
            </TableCell>
          </TableRow>
          <CustomTableRow colNames={columnNames} isHead={true} />
          <TableBody>
            {Object.keys(optionsState).map((strikePrice, index) => (
              <CustomTableRow
                key={index}
                colNames={columnNames}
                isHead={false}
                strk={strikePrice}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
