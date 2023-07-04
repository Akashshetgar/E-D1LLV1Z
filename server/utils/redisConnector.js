import { createClient } from 'redis';

const rclient = createClient();
rclient.on('error', err => console.log('Redis Client Error', err));
await rclient.connect();
console.log('Redis Client Connected');

export default rclient;