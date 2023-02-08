import express from 'express';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import ioRedis from 'ioredis';

dotenv.config();

const redis = new ioRedis(process.env.REDIS);
redis.set('foo', 'bar');
const app = express();

app.get('/redis', async (req, res) => {
  const foo = await redis.get('foo');
  const info = await redis.info();
  res.send(`Hello World from ${foo} <br/> <pre>${info}</pre>`);
});

app.listen(3000, () => {
  console.log('Before debuger');
  console.log(process.env.REDIS);
  console.log('Server started...');
});
