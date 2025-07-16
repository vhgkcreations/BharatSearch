function search() {
  const q = document.getElementById("query").value;
  if (!q) return;

  const proxyUrl = "https://api.allorigins.win/get?url=";
  const targetUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json`;

  fetch(proxyUrl + encodeURIComponent(targetUrl))
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Network response was not ok.");
    })
    .then(data => {
      const parsedData = JSON.parse(data.contents);
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = "<h3>Results:</h3>";

      if (parsedData.RelatedTopics && parsedData.RelatedTopics.length > 0) {
        parsedData.RelatedTopics.forEach(item => {
          if (item.Text && item.FirstURL) {
            resultsDiv.innerHTML += `
              <p><a href="${item.FirstURL}" target="_blank">${item.Text}</a></p>
            `;
          }
        });
      } else {
        resultsDiv.innerHTML += "<p>No results found.</p>";
      }
    })
    .catch(error => {
      document.getElementById("results").innerHTML =
        `<p>Error fetching results: ${error.message}</p>`;
    });
}
