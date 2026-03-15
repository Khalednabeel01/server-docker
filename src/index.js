const express = require('express');
const mongoose = require("mongoose");
const redis = require('redis');
const app = express();
const port = process.env.PORT || 4000;
//Connect to MongoDB
const USER_DB = 'root';
const PASS_DB = 'example';
const PORT_DB = '27017';
//const Host_DB = '172.20.0.3';

// connect to redis
const redisclient = redis.createClient({url: 'redis://redis:6379'});
redisclient.on('error', (err) => console.log('Redis Client Error', err));
redisclient.on('connect', () => console.log('Redis Connected'));
redisclient.connect()


const URI = `mongodb://${USER_DB}:${PASS_DB}@mongo:${PORT_DB}`;
mongoose.connect(URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get('/', (req, res) => {
  redisclient.set('greeting', 'Hello from Redis!');
  res.send('Hello World! Everyone! How are you doing? ya allah ')
});


app.get('/data', async (req, res) => {
  const greeting = await redisclient.get('greeting');
  res.send(`Hello World! Everyone! How are you doing? ya allah <h2>${greeting}</h2>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});