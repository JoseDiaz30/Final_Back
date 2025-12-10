import express from 'express';
import cors from 'cors';
const app = express();

// Allow requests from your frontend
app.use(cors({ origin: 'http://localhost:5173' }));

// Or allow all origins (less secure, but useful for dev)
app.use(cors());

app.listen(5000, () => {
  console.log('API running on http://localhost:5000');
});
