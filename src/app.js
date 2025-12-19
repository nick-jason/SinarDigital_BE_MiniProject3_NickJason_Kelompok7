import express from 'express';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const user = [];

app.use((req, res, next) => {
    console.log('Time', Date.now());
    next();
})

import apiRoutes from './routes/api.js';
apiRoutes(app);

app.use((req, res) => {
    res.status(404);
    res.send('<h1>404 Not Found</h1>');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api/v1/`);
});