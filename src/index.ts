import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';

import authRoute from './routes/auth.route';
import bookingRoute from './routes/booking.route';
import roomRoute from './routes/room.route';
import userRoute from './routes/user.route';

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || ''],
    credentials: true,
  })
);

app.use(helmet());

app.use('/api/auth', authRoute);
app.use('api/bookings', bookingRoute);
app.use('api/rooms', roomRoute);
app.use('api/users', userRoute);

app.get('/', (req, res) => {
  res.send('Welcome to the new hotel application...');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
