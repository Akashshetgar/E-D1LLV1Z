import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { socket } from '../socket';

const GetJSON = () => {
  useEffect(() => {
   
    // Handle events or data received from the server
    socket.on('data', (data) => {
      console.log('Received data from server:', data);
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // Your component code...

  return <div>UwU</div>;
};

export default GetJSON;
