# URL Shortener

A simple URL shortener service built with Node.js, Express, and SQLite.

## Features
- Shorten long URLs
- Retrieve original URLs using short codes
- Track access count and creation date
- Update or delete short URLs

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   # or
   node src/app.js
   ```

3. **Database:**
   - The app uses SQLite. The database file (`urlshortener.db`) will be created automatically in the project directory.
   - No manual database setup is required.

## API Endpoints

- `POST /shorten` — Shorten a URL
- `GET /url/:shortCode` — Get URL info and stats
- `PUT /url/:shortCode` — Update original URL
- `DELETE /url/:shortCode` — Delete short URL
- `GET /url/:shortCode/stats` — Get stats for a short URL

## Notes
- The app no longer uses MySQL. All data is stored in a local SQLite database file.
- If you previously used MySQL, you can safely remove the `mysql2` package:
  ```bash
  npm uninstall mysql2
  ```

## License
MIT 