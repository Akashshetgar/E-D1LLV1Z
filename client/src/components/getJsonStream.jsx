import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { socket } from '../socket';


const GetJSON = () => {
  useEffect(() => {
    // const socket = io('http://localhost:5000'); // Replace with your server URL

    socket.on('connect', console.log('connected socket : ', socket.id));

    console.log(socket.connected);
    socket.on('data', (data) => {
        console.log('Received data from server:', data);
    });

    socket.on('disconnect', console.log('disconnected socket'));
    // // Clean up the socket connection when component unmounts
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  // Your component code...

  return <div>Your component</div>;
};

export default GetJSON;