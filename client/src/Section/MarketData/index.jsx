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

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const sample = [
	[0,0,200,10,458,200,20,0,0,0,0,194,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,192,0,0,0,0,10,0,187,5,0,1,0,],
	[0,0,0,0,0,0,0,0,0,0,0,164,0,0,0,0,5,0,13,5,0,-3,0,],
];

  function createData(id, ...values) {
	const data = {};
	columns.forEach((column, index) => {
	  data[column.dataKey] = values[index];
	});
	return { id, ...data };
  }
  

const columns = [
	{label: 'OI',dataKey: 'oi1',numeric: true,},
	{label: 'CHNG IN OI',dataKey: 'chngoi1',numeric: true,},
	{label: 'VOLUME',dataKey: 'volume1',numeric: true,},
	{label: 'IV',dataKey: 'iv1',numeric: true,},
	{label: 'LTP',dataKey: 'ltp1',numeric: true,},
	{label: 'LTQ',dataKey: 'ltq1',numeric: true,},
	{label: 'CHNG',dataKey: 'chng1',numeric: true,},
	{label: 'BID QTY',dataKey: 'bidqty1',numeric: true,},
	{label: 'BID PRICE',dataKey: 'bidprice1',numeric: true,},
	{label: 'ASK QTY',dataKey: 'askqty1',numeric: true,},
	{label: 'ASK PRICE',dataKey: 'askprice1',numeric: true,},
	{label: 'STRIKE',dataKey: 'strike',numeric: true,},
	{label: 'ASK PRICE',dataKey: 'askprice2',numeric: true,},
	{label: 'ASK QTY',dataKey: 'askqty2',numeric: true,},
	{label: 'BID PRICE',dataKey: 'bidprice2',numeric: true,},
	{label: 'BID QTY',dataKey: 'bidqty2',numeric: true,},
	{label: 'CHNG',dataKey: 'chng2',numeric: true,},
	{label: 'LTQ',dataKey: 'ltq2',numeric: true,},
	{label: 'LTP',dataKey: 'ltp2',numeric: true,},
	{label: 'IV',dataKey: 'iv2',numeric: true,},
	{label: 'VOLUME',dataKey: 'volume2',numeric: true,},
	{label: 'CHNG IN OI',dataKey: 'chngoi2',numeric: true,},
	{label: 'OI',dataKey: 'oi2',numeric: true,},
];
  
  const rows = Array.from({ length: 50 }, (_, index) => {
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

  function Dropdown({ label, options, selectedOption, onOptionChange }) {
	return (
	  <Box sx={{ minWidth: 120 }}>
		<FormControl fullWidth>
		  <InputLabel
			id={`${label}-label`}
			sx={{ color: 'whitesmoke' }}
		  >
			{label}
		  </InputLabel>
		  <Select
			labelId={`${label}-label`}
			id={`${label}-select`}
			value={selectedOption}
			label={label}
			onChange={onOptionChange}
			sx={{
			  backgroundColor: '#1c4684',
			  color: 'whitesmoke',
			  width: 150,
			  '& .MuiSelect-icon': {
				color: '#0a1d2f',
			  },
			  '& .MuiMenuItem-root': {
				color: 'whitesmoke',
				backgroundColor: '#0a1d2f',
			  },
			  '& .MuiListItem-root.Mui-selected': {
				backgroundColor: '#0a1d2f',
			  },
			  '& .MuiListItem-root.Mui-selected:hover': {
				backgroundColor: '#0a1d2f',
			  },
			}}
		  >
			{options.map((option, index) => (
			  <MenuItem key={index} value={option}>
				{option}
			  </MenuItem>
			))}
		  </Select>
		</FormControl>
	  </Box>
	);
  }
  

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align='center'
          style={{ width: 20,backgroundColor: '#1c4684' ,color: 'whitesmoke' }}
		  
          sx={{
            backgroundColor: 'grey.300',fontSize: 11,fontWeight: 'bold',
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
		{columns.map((column) => {
		  let color;
		  if(row['ltp1'] > row['strike'] && ['oi1', 'chngoi1', 'volume1', 'iv1', 'ltp1', 'ltq1', 'chng1', 'bidqty1', 'bidprice1', 'askqty1', 'askprice1'].includes(column.dataKey)) {
			color = '#84811c';
		  } else if (row['ltp2'] < row['strike'] && row['ltp1'] < row['strike'] && ['askprice2', 'askqty2', 'bidprice2', 'bidqty2', 'chng2', 'ltq2', 'ltp2', 'iv2', 'volume2', 'chngoi2', 'oi2'].includes(column.dataKey)) {
			color = '#84811c';//Note that I did some jugaad here (&& row['ltp1'] < row['strike'])
		  } else {
			color = '#0a1d2f';
		  }
		  return (
			<TableCell
			  key={column.dataKey}
			  align='center'
			  style={{ 
				backgroundColor: color, 
				color: 'white' 
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
  
  

function MarketData() {
	const contractOptions = ['Contract 1', 'Contract 2', 'Contract 3'];
	const symbolOptions = ['Symbol 1', 'Symbol 2', 'Symbol 3'];
	const expiryDateOptions = ['Expiry Date 1', 'Expiry Date 2', 'Expiry Date 3'];
	const strikePriceOptions = ['Strike Price 1', 'Strike Price 2', 'Strike Price 3'];
  
	const [contract, setContract] = React.useState('');
	const [symbol, setSymbol] = React.useState('');
	const [expiryDate, setExpiryDate] = React.useState('');
	const [strikePrice, setStrikePrice] = React.useState('');

	

	return (
			<section id="MarketData1">


				<Heading index="01" heading="Option Chain (Equity Derivatives)" />
				<div style={{ display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
				<Dropdown 
					label="View Options Contract for" 
					options={contractOptions} 
					selectedOption={contract} 
					onOptionChange={(e) => setContract(e.target.value)} 
				/>
				<span style={{ margin: '0 10px' }}> OR </span>
				<Dropdown 
					label="Select Symbol" 
					options={symbolOptions} 
					selectedOption={symbol} 
					onOptionChange={(e) => setSymbol(e.target.value)} 
				/>
				<span style={{ margin: '0 10px'}}></span>
				<Dropdown 
					label="Expiry Date" 
					options={expiryDateOptions} 
					selectedOption={expiryDate} 
					onOptionChange={(e) => setExpiryDate(e.target.value)} 
				/>
				<span style={{ margin: '0 10px'}}> OR </span>
				<Dropdown 
					label="Strike Price" 
					options={strikePriceOptions} 
					selectedOption={strikePrice} 
					onOptionChange={(e) => setStrikePrice(e.target.value)} 
				/>
				</div>
				<br></br>
				{/* <div className={styles.tableContainer}> */}
				<Paper style={{ height: 1000, width: '100%' }}>
					<TableVirtuoso
						data={rows}
						components={VirtuosoTableComponents}
						fixedHeaderContent={fixedHeaderContent}
						itemContent={rowContent} />
				</Paper>
				{/* </div> */}
			</section>
	);
}

export default MarketData;
