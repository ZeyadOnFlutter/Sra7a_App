import connectDB from './DB/connection.js';
import { authRouter, messageRouter, userRouter } from './Modules/index.js';
import { BadRequestException, globalErrorHandler } from './Utils/Response/error.response.js';
import successResponse from './Utils/Response/success.response.js';

const bootstrap = async (app, express) => {
  app.use(express.json());

  await connectDB();

  app.get('/', (req, res) => {
    successResponse({ res, statusCode: 200, message: 'Hello From Sra7a Application' });
  });

  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/message', messageRouter);
  app.use('/api/v1/user', userRouter);

  app.all('/*dummy', (req, res) => {
    throw BadRequestException({ message: 'Not Found Handler!' });
  });

  app.use(globalErrorHandler);
};

export default bootstrap;
