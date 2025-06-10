const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb');
const cohereRoutes = require('./routes/cohere');
const authRoutes = require('./routes/auth.routes');
const sessionRoutes = require('./routes/session.routes');
const chatRoutes = require('./routes/chat.routes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const { logger } = require('./middleware/logger');
const { errorHandler, notFound } = require('./middleware/error.middleware');

app.use(logger);

app.use('/api/cohere', cohereRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/chats', chatRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>   console.log(`Server running at http://localhost:${PORT}`));
