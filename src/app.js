const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const urlRoutes = require('./routes/url');
const { getUrlByShortCode, incrementAccessCount } = require('./models/Url');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', urlRoutes);

// Redirect handler
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const url = await getUrlByShortCode(shortCode);
  if (url) {
    await incrementAccessCount(shortCode);
    res.redirect(url.original_url);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 