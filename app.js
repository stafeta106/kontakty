let dataset = [];

// odstranění diakritiky
function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// načtení datasetu
fetch("./data/povinne-subjekty.json")
  .then(r => r.json())
  .then(json => {
    dataset = json.data;
    console.log(`Načteno ${dataset.length} záznamů`);
  });

// autocomplete
const input = document.getElementById("search");
const results = document.getElementById("results");
const detail = document.getElementById("detail");

input.addEventListener("input", () => {
  const q = normalize(input.value.trim());
  results.innerHTML = "";
  detail.innerHTML = "";

  if (q.length < 2) return;

  const matches = dataset
    .filter(item => item.nazev_norm.includes(q))
    .slice(0, 20); // limit výsledků

  for (const item of matches) {
    const div = document.createElement("div");
    div.textContent = item.nazev;
    div.className = "result-item";

    div.addEventListener("click", () => showDetail(item));
    results.appendChild(div);
  }
});

function showDetail(item) {
  results.innerHTML = "";
  input.value = item.nazev;

  detail.innerHTML = `
    <h3>${item.nazev}</h3>
    <div>
      ${item.adresa.map(a => `<div>${a}</div>`).join("")}
    </div>
    <div><strong>Datová schránka:</strong> ${item.id}</div>
  `;
}

