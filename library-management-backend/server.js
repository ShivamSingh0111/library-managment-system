const express = require('express');
const cors = require('cors'); // 👉 Import cors

const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());
connectDB();

app.get('/', (req, res) => {
    res.send('LMS Api is Activate!');
});

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`);
});
