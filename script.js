function search() {
  const q = document.getElementById("query").value;
  if (!q) return;

  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&pretty=1`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = "<h3>Results:</h3>";

      if (data.RelatedTopics && data.RelatedTopics.length > 0) {
        data.RelatedTopics.forEach(item => {
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
    .catch(err => {
      document.getElementById("results").innerHTML = `<p>Error fetching results: ${err}</p>`;
    });
}


function askAI() {
  const aiQ = document.getElementById("aiQuery").value;
  document.getElementById("results").innerHTML = `
    <p>🤖 BharatAI says: <strong>${aiQ}</strong> <br />(Answer engine coming soon)</p>
  `;
}
