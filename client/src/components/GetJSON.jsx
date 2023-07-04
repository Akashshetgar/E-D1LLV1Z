/* eslint-disable no-unreachable */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { socket } from '../socket.js';


const GetJSON = () => {
  const [data, setData] = React.useState([]); 
  const [allTradingSymbols, setAllTradingSymbols] = React.useState([]);

  useEffect(() => {

    socket.on('connect', ()=>console.log('connected socket : ', socket.id));

    console.log(socket.connected);
    socket.on('data', (data) => {
      if (data.length > 0){
        handleAddData(data);
        console.log('Received data from server:', data);
      }      
    });

    // socket.on('ALLBANKS06JUL2344400CE',(data)=>{
    //   console.log('sock data ', data);
    // })

    // socket.on("allTradingSymbols", (data) => {
    //   if(data !== undefined){
    //     console.log('allTradingSymbols ', data);
    //     setAllTradingSymbols(data);
    //   }
    // });
    
    socket.on('disconnect', ()=>console.log('disconnected socket'));
    // // Clean up the socket connection when component unmounts
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

  const handleAddData = (dataArg) => {
    const newData = [...data];
    newData.push(dataArg);
    setData(newData);
  }

  const filterArray = (key, value) => {
    const filteredArray = data.filter((item) => {
      // console.log(item[key] == value);
      // console.log(`${item[key]}==${value}:${item[key]==value}`)
      return item[key] == value;
    });

    // Use the filteredArray as needed
    // console.log(filteredArray);
    return filteredArray;
  };

  const sortArrayByTimeStamp = () => {
    const sortedArray = data.sort((a, b) => {
      return new Date(a.timeStamp) - new Date(b.timeStamp);
    });

    // Use the sortedArray as needed
    // console.log(sortedArray);
    return sortedArray;
  };
  
  var testArray = filterArray('name', "MAINIDX");
  testArray = sortArrayByTimeStamp(testArray);

  // Your component code...

  return(
    <div>
      {
        testArray.map((item) => {
          {/* return <div>This should not be displayed</div>; */}
          return <div style={{ display: "none" }}>This should not be displayed</div>;
        })
      }
    </div>
  );
    
};

export default GetJSON;