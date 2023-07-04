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
import { useEffect } from 'react';
import { socket } from '../../socket.js';
import { useContext } from "react";
import { OptionsContext } from "../../contexts/OptionsContext";
import { IndexContext } from "../../contexts/IndexContext";

const sample = [
  [
    0, 0, 200, 10, 458, 200, 20, 0, 0, 0, 0, 194, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 192, 0, 0, 0, 0, 10, 0, 187, 5, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 164, 0, 0, 0, 0, 5, 0, 13, 5, 0, -3, 0],
];

function createData(id, ...values) {
  const data = {};
  columns.forEach((column, index) => {
    data[column.dataKey] = values[index];
  });
  return { id, ...data };
}

const columns = [
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

const rows = Array.from({ length: 50 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

// const rows = Array.from({ length: 50 }, (_, index) => {
// 	const randomSelection = sample[Math.floor(Math.random() * sample.length)];
// 	const row = createData(index, ...randomSelection);
// 	const isLtp1GreaterThanStrike = row.ltp1 > row.strike;
// 	const isLtp2LesserThanStrike = row.ltp2 < row.strike;
// 	row.style = {
// 	  backgroundColor: isLtp1GreaterThanStrike ? 'yellow' : '#0a1d2f',
// 	  backgroundColor: isLtp2LesserThanStrike ? 'yellow' : '#0a1d2f',
// 	};
// 	return row;
//   });

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="center"
          style={{ width: 20, backgroundColor: "#1c4684", color: "whitesmoke" }}
          sx={{
            backgroundColor: "grey.300",
            fontSize: 11,
            fontWeight: "bold",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

// function rowContent(_index, row) {
//   return (
//     <React.Fragment>
//       {columns.map((column) => (
//         <TableCell
//           key={column.dataKey}
//           align='center'
// 		  style={{ backgroundColor: '#0a1d2f', color: 'white' }}
// 		  sx={{
//             fontSize: 12,
//           }}
//         >
//           {row[column.dataKey]}
//         </TableCell>
//       ))}
//     </React.Fragment>
//   );
// }

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => {
        let color;
        if (
          row["ltp1"] > row["strike"] &&
          [
            "oi1",
            "chngoi1",
            "volume1",
            "iv1",
            "ltp1",
            "ltq1",
            "chng1",
            "bidqty1",
            "bidprice1",
            "askqty1",
            "askprice1",
          ].includes(column.dataKey)
        ) {
          color = "#84811c";
        } else if (
          row["ltp2"] < row["strike"] &&
          row["ltp1"] < row["strike"] &&
          [
            "askprice2",
            "askqty2",
            "bidprice2",
            "bidqty2",
            "chng2",
            "ltq2",
            "ltp2",
            "iv2",
            "volume2",
            "chngoi2",
            "oi2",
          ].includes(column.dataKey)
        ) {
          color = "#84811c"; //Note that I did some jugaad here (&& row['ltp1'] < row['strike'])
        } else {
          color = "#0a1d2f";
        }
        return (
          <TableCell
            key={column.dataKey}
            align="center"
            style={{
              backgroundColor: color,
              color: "white",
            }}
            sx={{
              fontSize: 12,
            }}
          >
            {row[column.dataKey]}
          </TableCell>
        );
      })}
    </React.Fragment>
  );
}

const filterArray = (key, value, data) => {
  const filteredArray = data.filter((item) => {
    // console.log(item[key] == value);
    // console.log(`${item[key]}==${value}:${item[key]==value}`)
    return item[key] == value;
  });

  // Use the filteredArray as needed
  // console.log(filteredArray);
  return filteredArray;
};

const sortArrayByTimeStamp = (data) => {
  const sortedArray = data.sort((a, b) => {
    return new Date(a.timeStamp) - new Date(b.timeStamp);
  });

  // Use the sortedArray as needed
  // console.log(sortedArray);
  return sortedArray;
};

function DataTable() {
  const [data, setData] = React.useState([]); 
  const {optionsState, setOptionsState} = useContext(OptionsContext); 
  const {indexState, setIndexState} = useContext(IndexContext); 

  const handleAddData = (dataArg) => {
    dataArg.map((entry, index) => {
      if (entry.type=="index") {
        setIndexState((prevState)=>{
          return {...prevState, [entry.index]: entry}   // Do something about prev LTP
        })
      }else{
        setOptionsState((prevState)=>{
          const strikePrice = entry.strikePrice;
          const newEntry = {...prevState}
          if(entry.type=="CE"){
            let temp = newEntry[strikePrice]
            temp.CE = entry
          }
          return {newEntry}

          
        })
      }
    })


    const newData = [...data];
    newData.push(dataArg);
    setData(newData);
  }

  useEffect(() => {

    socket.on('connection', ()=>console.log('connected socket : ', socket.id));

    console.log(socket.connected);
    socket.on('data', (data) => {
      if (data.length > 0){
        handleAddData(data);
        console.log('Received data from server:', data);
      }
      
    });
    
    socket.on('disconnect', ()=>console.log('disconnected socket'));

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

  let testArray = filterArray('name', "MAINIDX", data);
  testArray = sortArrayByTimeStamp(testArray, data);
  console.log("Data being sorted");

  return (
    <section id="MarketData">
      <Heading index="01" heading="Option Chain (Equity Derivatives)" />

      {/* <div className={styles.tableContainer}> */}
      <Paper style={{ height: 1000, width: "100%" }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
      {/* </div> */}
    </section>
  );
}

export default DataTable;
