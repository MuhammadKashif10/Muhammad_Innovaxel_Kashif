<<<<<<< HEAD
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
=======
# Muhammad_Innovaxel_Kashif
URL_SHORTENER
# 🔗 URL Shortener

A simple and efficient URL shortening service that allows users to convert long URLs into short, easy-to-share links. Ideal for social media, email marketing, and simplifying complex URLs.

---

## 🚀 Features

- ✅ Shorten long URLs into unique, compact links  
- 🔤 Create custom short URLs (e.g., `yourdomain.com/kashif123`)  
- 📈 Track total number of clicks per short link  
- ⏳ Optional expiration for short links  
- 💻 Responsive and user-friendly interface  
- 🔒 Basic validation and error handling

---

## 🛠️ Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | HTML, CSS, JavaScript *(or React)* |
| Backend     | FastAPI *(or Node.js/Express, Flask, etc.)* |
| Database    | MySQL *(or MongoDB/PostgreSQL)* |
| Deployment  | Vercel / Netlify / Render / Heroku |

---

## 📁 Project Structure

url-shortener/
├── backend/
│ ├── main.py
│ ├── models/
│ └── routes/
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
├── README.md
└── requirements.txt / package.json
>>>>>>> 03247b548403c1cea3afec3c60cc0695e541a287
