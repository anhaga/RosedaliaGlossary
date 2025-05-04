let data = [];

async function loadData() {
  const res = await fetch('data.json');
  data = await res.json();
  displayResults('');
}

function displayResults(query) {
  const results = document.getElementById('results');
  results.innerHTML = '';

  const filtered = data
    .filter(entry =>
      entry.word.toLowerCase().includes(query.toLowerCase()) ||
      (entry.english_word && entry.english_word.toLowerCase().includes(query.toLowerCase()))
    )
    .sort((a, b) => {
      const getSortKey = (entry) => {
        if (entry.word_type === "verb" && entry.word.toLowerCase().startsWith("to ")) {
          return entry.word.slice(3).toLowerCase();
        }
        return entry.word.toLowerCase();
      };
      return getSortKey(a).localeCompare(getSortKey(b));
    });

  filtered.forEach(entry => {
    const li = document.createElement('li');
    li.className = 'card';

    const english = entry.english_word
      ? `<div class="english">${entry.english_word}</div>` : '';

    const etymology = entry.etymology
      ? `<div class="etymology"><span class="etymology-label">Etymology:</span> ${entry.etymology}</div>`
      : '';


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

// Tab switching
const tabDict = document.getElementById('tab-dictionary');
const tabLore = document.getElementById('tab-lore');
const dictView = document.querySelector('main');
const loreView = document.getElementById('lore');

tabDict.addEventListener('click', () => {
  tabDict.classList.add('active');
  tabLore.classList.remove('active');
  dictView.classList.remove('hidden');
  loreView.classList.add('hidden');
});

tabLore.addEventListener('click', () => {
  tabLore.classList.add('active');
  tabDict.classList.remove('active');
  dictView.classList.add('hidden');
  loreView.classList.remove('hidden');
});

// Load Markdown lore
fetch('lore.md')
  .then(res => res.text())
  .then(md => {
    document.getElementById('lore-content').innerHTML = marked.parse(md);
  });
