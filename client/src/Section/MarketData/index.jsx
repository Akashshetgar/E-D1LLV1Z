import Heading from "../../Components/Heading";
import styles from "./styles.module.css";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';


const sample = [
	[0,0,200,10,458,200,20,0,0,0,0,194,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,192,0,0,0,0,10,0,187,5,0,1,0,],
	[0,0,0,0,0,0,0,0,0,0,0,164,0,0,0,0,5,0,13,5,0,-3,0,],
];

// function createData(id, dessert, calories, fat, carbs, protein) {
// return { id, dessert, calories, fat, carbs, protein };
// }

// function createData(id, symbol, LTP, LTQ, totalTradedVolume, bestBid, bestAsk, bestBidQty, bestAskQty, openInterest, askqty1, askprice1, strike, askprice2, askqty2, bidprice2, bidqty2, chng2, ltq2, ltp2, iv2, volume2, chngoi2, oi2) {
// 	return {id,symbol,LTP,LTQ,totalTradedVolume,bestBid,bestAsk,bestBidQty,bestAskQty,openInterest,askqty1,askprice1,strike,askprice2,askqty2,bidprice2,bidqty2,chng2,ltq2,ltp2,iv2,volume2,chngoi2,oi2
// 	};
//   }

  function createData(id, ...values) {
	const data = {};
	columns.forEach((column, index) => {
	  data[column.dataKey] = values[index];
	});
	return { id, ...data };
  }
  

const columns = [
	{width: 200,label: 'OI',dataKey: 'oi1',numeric: true,},
	{width: 200,label: 'CHNG IN OI',dataKey: 'chngoi1',numeric: true,},
	{width: 120,label: 'VOLUME',dataKey: 'volume1',numeric: true,},
	{width: 200,label: 'IV',dataKey: 'iv1',numeric: true,},
	{width: 120,label: 'LTP',dataKey: 'ltp1',numeric: true,},
	{width: 120,label: 'LTQ',dataKey: 'ltq1',numeric: true,},
	{width: 200,label: 'CHNG',dataKey: 'chng1',numeric: true,},
	{width: 120,label: 'BID QTY',dataKey: 'bidqty1',numeric: true,},
	{width: 120,label: 'BID PRICE',dataKey: 'bidprice1',numeric: true,},
	{width: 120,label: 'ASK QTY',dataKey: 'askqty1',numeric: true,},
	{width: 120,label: 'ASK PRICE',dataKey: 'askprice1',numeric: true,},
	{width: 120,label: 'STRIKE',dataKey: 'strike',numeric: true,},
	{width: 120,label: 'ASK PRICE',dataKey: 'askprice2',numeric: true,},
	{width: 120,label: 'ASK QTY',dataKey: 'askqty2',numeric: true,},
	{width: 120,label: 'BID PRICE',dataKey: 'bidprice2',numeric: true,},
	{width: 120,label: 'BID QTY',dataKey: 'bidqty2',numeric: true,},
	{width: 200,label: 'CHNG',dataKey: 'chng2',numeric: true,},
	{width: 120,label: 'LTQ',dataKey: 'ltq2',numeric: true,},
	{width: 120,label: 'LTP',dataKey: 'ltp2',numeric: true,},
	{width: 200,label: 'IV',dataKey: 'iv2',numeric: true,},
	{width: 120,label: 'VOLUME',dataKey: 'volume2',numeric: true,},
	{width: 200,label: 'CHNG IN OI',dataKey: 'chngoi2',numeric: true,},
	{width: 200,label: 'OI',dataKey: 'oi2',numeric: true,},
];
  
  const rows = Array.from({ length: 200 }, (_, index) => {
	const randomSelection = sample[Math.floor(Math.random() * sample.length)];
	return createData(index, ...randomSelection);
  });
  
  const VirtuosoTableComponents = {
	Scroller: React.forwardRef((props, ref) => (
	  <TableContainer component={Paper} {...props} ref={ref} />
	)),
	Table: (props) => (
	  <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
	),
	TableHead,
	TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
	TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width,backgroundColor: '#000050' ,color: 'whitesmoke' }}
		  
          sx={{
            backgroundColor: 'grey.300',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
		  style={{ backgroundColor: '#CCE5FF', color: 'black' }}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

function MarketData() {
	return (
		<section id="MarketData">
			<Heading index="01" heading="Option Chain (Equity Derivatives)" />
			
			{/* <div className={styles.tableContainer}> */}
				<Paper style={{ height: 400, width: '100%' }}>
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

export default MarketData;
