const queries = [
  "kidney beans",
  "chickpeas",
  "yellow lentils",
  "red lentils",
  "split peas",
  "soybeans",
  "black beans",
  "cumin seeds",
  "coriander seeds",
  "cumin powder",
  "garam masala"
];

async function fetchIds() {
  const results = {};
  for (const q of queries) {
    try {
      const res = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=1`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        results[q] = data.results[0].id; // The Unsplash ID
      } else {
        results[q] = null;
      }
    } catch (e) {
      results[q] = "error";
    }
  }
  console.log(JSON.stringify(results, null, 2));
}

fetchIds();
