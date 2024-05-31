import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middleware/globalerrorhandler';

import routes from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application router

// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semester', SemesterRoutes);
app.use('/api/v1', routes);

// testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('hijibiji error ')
// })

// global error handler
app.use(globalErrorHandler);
//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    messages: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        messages: 'Api Not found',
      },
    ],
  });
  next();
});

export default app;
