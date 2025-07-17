document.getElementById('shorten-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const url = document.getElementById('originalUrl').value;
  const resultDiv = document.getElementById('result');
  resultDiv.classList.add('d-none');
  try {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl: url })
    });
    const data = await res.json();
    if (data.shortCode) {
      const shortUrl = `${window.location.origin}/${data.shortCode}`;
      resultDiv.innerHTML = `Short URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
      resultDiv.classList.remove('d-none');
    } else {
      resultDiv.innerHTML = 'Error: ' + (data.error || 'Unknown error');
      resultDiv.classList.remove('d-none');
    }
  } catch (err) {
    resultDiv.innerHTML = 'Error: ' + err.message;
    resultDiv.classList.remove('d-none');
  }
}); 