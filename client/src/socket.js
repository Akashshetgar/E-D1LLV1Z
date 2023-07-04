/* eslint-disable no-unused-vars */
import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
// const URL = import.meta.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';
const URL = import.meta.env.NODE_PORT;

export const socket = io('http://127.0.0.1:5000', {
  autoConnect: true
});
