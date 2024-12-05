import express from 'express';
import search from './lib/search.js';
import download from './lib/download.js';
import getShowTitles from './lib/getShowTitles.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Search endpoint
app.get('/search', async (req, res) => {
    try {
        const { show, season, episode } = req.query;
        const results = await search(show, season, episode);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Download endpoint
app.get('/download', async (req, res) => {
    try {
        const { url } = req.query;
        const subtitle = await download(url);
        res.set('Content-Type', 'application/octet-stream');
        res.set('Content-Disposition', `attachment; filename=${subtitle.filename}`);
        res.send(subtitle.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get show titles endpoint
app.get('/titles', async (req, res) => {
    try {
        const { query } = req.query;
        const titles = await getShowTitles(query);
        res.json(titles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
