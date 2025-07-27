const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/get-video-title', async (req, res) => {
    const { videoId } = req.query;
    if (!videoId) {
        return res.status(400).json({ error: 'Missing videoId parameter' });
    }

    try {
        const response = await axios.get(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`);
        res.json({ title: response.data.title });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch video title' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
