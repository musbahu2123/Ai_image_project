import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config(); // Must come first

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/posts', postRoutes);
app.use('/cloud.leonardo.ai/api/rest/v1/generations', dalleRoutes);


app.get("/", async (req, res) => {
    res.send('Hello from me get route index');
});

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL); // Ensure it's properly passed here
        app.listen(8080,);
    } catch (error) {
        console.log("Failed to start the server:", error.message);
    }
};

startServer();