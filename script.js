function search() {
  const query = document.getElementById("query").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Searching Wikipedia...</p>";

  if (!query) return;

  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      resultsDiv.innerHTML = "<h3>Search Results:</h3>";
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
          <div class="result-box">
            <a href="${pageUrl}" target="_blank"><strong>${title}</strong></a>
            <p>${snippet}...</p>
          </div>
        `;
      });
    })
    .catch(error => {
      resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
