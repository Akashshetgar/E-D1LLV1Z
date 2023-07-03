import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend , ResponsiveContainer} from 'recharts';

const PnLGraph = ({ askPrice, bidPrice, strikePrice }) => {
  // Calculate P&L data based on the provided parameters
  const calculatePnLData = () => {
    const data = [];

    // Add your calculations here to generate P&L data
    // Example:
    var val =strikePrice/100 
    for (let i = strikePrice-100; i < strikePrice+100; i = i+10) {
      const underlyingPrice = i;
      const buyPayoff = Math.max(underlyingPrice-strikePrice, 0) - askPrice;
      const sellPayoff = -Math.max(-strikePrice + underlyingPrice, 0) + askPrice;
    //   const pnl = (askPrice - bidPrice) * (askQuantity - bidQuantity) * (underlyingPrice - strikePrice);

      data.push({ underlyingPrice, buyPayoff,sellPayoff });
    }

    return data;
  };

  // Get the P&L data
  const pnlData = calculatePnLData();

  return (
    // <ResponsiveContainer width="800px" height="400px">
    // </ResponsiveContainer>
        <LineChart width={800} height={400} data={pnlData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="underlyingPrice" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="buyPayoff" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="sellPayoff" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
  );
};

export default PnLGraph;
