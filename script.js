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
    entry.word.toLowerCase().includes(query.toLowerCase()) ||
    (entry.english_word && entry.english_word.toLowerCase().includes(query.toLowerCase()))
  );

  filtered.forEach(entry => {
    const li = document.createElement('li');
    li.className = 'card';

    const english = entry.english_word
      ? `<div class="english">${entry.english_word}</div>` : '';

    const etymology = entry.etymology
      ? `<div class="etymology">${entry.etymology}</div>` : '';

    const examples = entry.examples && entry.examples.length
      ? `<div class="examples"><strong>Examples:</strong><ul>${entry.examples.map(e => `<li>${e}</li>`).join('')}</ul></div>`
      : '';

    li.innerHTML = `
      <div class="word">${entry.word}</div>
      ${english}
      <div class="type">(${entry.word_type})</div>
      <div class="definition">${entry.definition}</div>
      ${etymology}
      ${examples}
    `;

    results.appendChild(li);
  });
}

document.getElementById('search').addEventListener('input', (e) => {
  displayResults(e.target.value);
});

loadData();
