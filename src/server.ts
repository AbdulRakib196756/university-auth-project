import mongoose from 'mongoose';

import config from './config/index';
import app from './app';
import { logger, errorlogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.databaseurl as string);
    console.log('🛢️ data base successfully connected');

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('faild to run', error);
  }
  // unhandled rejection reduction
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on('Sigterm', () => {
  console.log('sigterm is recived....');
  if (server) {
    server.close();
  }
});
