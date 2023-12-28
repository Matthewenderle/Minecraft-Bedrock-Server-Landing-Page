import express from 'express';
import { pingBedrock } from '@minescope/mineping';
import { config } from './config.js';
const app = express();
const port = config.apiPort;

app.use(express.static('public'));

app.get('/api/server-status', async (req, res) => {
  const serverIP = config.serverIP;
  const serverPort = config.serverPort;
  const timeout = config.timeout;

  const response = await pingBedrock(serverIP, {
    port: serverPort,
    timeout: timeout,
  });

  res.json(response);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
