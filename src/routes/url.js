const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  getUrlByShortCode,
  incrementAccessCount,
  updateOriginalUrl,
  deleteUrl,
  getStats
} = require('../models/Url');

function generateShortCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Shorten a URL
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: 'Original URL required' });
  let shortCode;
  let exists;
  do {
    shortCode = generateShortCode();
    exists = await getUrlByShortCode(shortCode);
  } while (exists);
  await createShortUrl(originalUrl, shortCode);
  res.json({ shortCode });
});

// Get URL info and stats
router.get('/url/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const url = await getUrlByShortCode(shortCode);
  if (!url) return res.status(404).json({ error: 'Not found' });
  res.json(url);
});

// Update original URL
router.put('/url/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const { newUrl } = req.body;
  if (!newUrl) return res.status(400).json({ error: 'New URL required' });
  const updated = await updateOriginalUrl(shortCode, newUrl);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Updated' });
});

// Delete short URL
router.delete('/url/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const deleted = await deleteUrl(shortCode);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

// Get stats
router.get('/url/:shortCode/stats', async (req, res) => {
  const { shortCode } = req.params;
  const stats = await getStats(shortCode);
  if (!stats) return res.status(404).json({ error: 'Not found' });
  res.json(stats);
});

module.exports = router; 