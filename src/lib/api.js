const API_BASE = "https://www.googleapis.com/books/v1";

function getApiKeyParam() {
  const key = import.meta.env.VITE_GOOGLE_BOOKS_KEY;
  return key ? `&key=${encodeURIComponent(key)}` : "";
}

export async function fetchBooks({
  query,
  startIndex = 0,
  maxResults = 20,
  signal,
}) {
  const q = encodeURIComponent(query || "");
  const url = `${API_BASE}/volumes?q=${q}&startIndex=${startIndex}&maxResults=${maxResults}${getApiKeyParam()}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
