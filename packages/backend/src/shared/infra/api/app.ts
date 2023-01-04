import express from 'express';
import morgan from 'morgan';
import { v1Router } from './v1/router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use('/api/v1', v1Router);

const port = process.env.PORT || 4000;

app.get('/', (_, res) => {
  return res.json({ message: "Yo! we're up" });
});

app.listen(port, () => {
  console.log(`[App]: Listening on port ${port}`);
});
