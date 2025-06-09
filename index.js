const express = require('express');
const cors = require('cors');
const cohereRoutes = require('./routes/cohere');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/cohere', cohereRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>   console.log(`Server running at http://localhost:${PORT}`));
