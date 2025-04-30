let data = [];

async function loadData() {
  const res = await fetch('data.json');
  data = await res.json();
  displayResults('');
}

function displayResults(query) {
  const results = document.getElementById('results');
  results.innerHTML = '';

  const filtered = data.filter(entry =>
    entry.word.toLowerCase().includes(query.toLowerCase())
  );

  filtered.forEach(entry => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${entry.word}</strong>: ${entry.definition}`;
    results.appendChild(li);
  });
}

document.getElementById('search').addEventListener('input', (e) => {
  displayResults(e.target.value);
});

loadData();
