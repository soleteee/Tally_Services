const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const envFilePath = path.join(__dirname, '../.env');
if (fs.existsSync(envFilePath)) {
    const rawEnvBuffer = fs.readFileSync(envFilePath);
    const isUtf16Le = rawEnvBuffer.length >= 2 && rawEnvBuffer[0] === 0xff && rawEnvBuffer[1] === 0xfe;
    const rawEnvText = isUtf16Le
        ? rawEnvBuffer.toString('utf16le')
        : rawEnvBuffer.toString('utf8');
    const parsedEnv = dotenv.parse(rawEnvText);
    Object.assign(process.env, parsedEnv);
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tally_services';

// Middleware
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://localhost:5176',
        'http://mittalonlineservices.com',
        'http://www.mittalonlineservices.com',
        'http://admin.mittalonlineservices.com',
        'https://mittalonlineservices.com',
        'https://www.mittalonlineservices.com',
        'https://admin.mittalonlineservices.com'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Backend is running',
    });
});

app.get('/api/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'API healthy',
    });
});

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/poster', require('./routes/posterRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api', require('./routes/seoRoutes'));
app.use('/api', require('./routes/seoAuthRoutes'));
app.use('/api', require('./routes/authRoutes'));


// Database Connection
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        console.log('Database name:', mongoose.connection.name);
        console.log('Collections:', Object.keys(mongoose.connection.collections));
    })
    .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
