import express from 'express';
// import {
//   adminRouter,
//   clientRouter,
// } from '../../../../modules/users/infra/http/routes';
// import {
//   bookingRouter,
//   paymentRouter,
//   pitchRouter,
//   placeRouter,
// } from '../../../../modules/booking/infra/http/routes';

const v1Router = express.Router();

v1Router.get('/', (_, res) => {
  return res.json({ message: "api/v1/ Yo! we're up" });
});

// v1Router.use('/admin', adminRouter);
// v1Router.use('/booking', bookingRouter);
// v1Router.use('/client', clientRouter);
// v1Router.use('/payment', paymentRouter);
// v1Router.use('/pitches', pitchRouter);
// v1Router.use('/places', placeRouter);

export { v1Router };
