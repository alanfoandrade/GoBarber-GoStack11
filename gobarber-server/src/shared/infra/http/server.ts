/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import app from './app';

app.listen(process.env.APP_API_PORT, () => {
  console.log(
    `⚡️ Server listening on ${process.env.APP_API_URL}:${process.env.APP_API_PORT}`,
  );
});
