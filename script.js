function search() {
  const q = document.getElementById("query").value;
  document.getElementById("results").innerHTML = `
    <p>🔍 Searching for: <strong>${q}</strong> <br />(Full results coming soon)</p>
  `;
}

function askAI() {
  const aiQ = document.getElementById("aiQuery").value;
  document.getElementById("results").innerHTML = `
    <p>🤖 BharatAI says: <strong>${aiQ}</strong> <br />(Answer engine coming soon)</p>
  `;
}
