function search() {
  const q = document.getElementById("query").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Searching Wikipedia...</p>";

  if (!q) return;

  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&origin=*`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      resultsDiv.innerHTML = "<h3>Results:</h3>";
      const results = data.query.search;

      if (results.length === 0) {
        resultsDiv.innerHTML += "<p>No results found.</p>";
        return;
      }

      results.forEach(item => {
        const title = item.title;
        const snippet = item.snippet;
        const pageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

        resultsDiv.innerHTML += `
          <div style="margin-bottom: 15px;">
            <a href="${pageUrl}" target="_blank"><strong>${title}</strong></a>
            <p>${snippet}...</p>
          </div>
        `;
      });
    })
    .catch(err => {
      resultsDiv.innerHTML = `<p>Error: ${err.message}</p>`;
    });
}
