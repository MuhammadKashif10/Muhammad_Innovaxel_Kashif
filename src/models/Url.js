const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../urlshortener.db');
const db = new sqlite3.Database(dbPath);

const initSql = `
  CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_url TEXT NOT NULL,
    short_code TEXT NOT NULL UNIQUE,
    access_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;
db.run(initSql);

function createShortUrl(originalUrl, shortCode) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO urls (original_url, short_code) VALUES (?, ?)',
      [originalUrl, shortCode],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
}

function getUrlByShortCode(shortCode) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM urls WHERE short_code = ?',
      [shortCode],
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });
}

function incrementAccessCount(shortCode) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE urls SET access_count = access_count + 1 WHERE short_code = ?',
      [shortCode],
      function (err) {
        if (err) return reject(err);
        resolve();
      }
    );
  });
}

function updateOriginalUrl(shortCode, newUrl) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE urls SET original_url = ? WHERE short_code = ?',
      [newUrl, shortCode],
      function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      }
    );
  });
}

function deleteUrl(shortCode) {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM urls WHERE short_code = ?',
      [shortCode],
      function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      }
    );
  });
}

function getStats(shortCode) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT access_count, created_at FROM urls WHERE short_code = ?',
      [shortCode],
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });
}

module.exports = {
  createShortUrl,
  getUrlByShortCode,
  incrementAccessCount,
  updateOriginalUrl,
  deleteUrl,
  getStats
}; 
