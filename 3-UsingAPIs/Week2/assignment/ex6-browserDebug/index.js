/*
Full description at:https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-6-using-the-browser-debugger
*/

'use strict';

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.entries(options).forEach(([key, value]) => {
    if (key === 'text') {
      elem.textContent = value;
    } else {
      elem.setAttribute(key, value);
    }
  });
  return elem;
}

function addTableRow(table, label, value) {
  const tr = createAndAppend('tr', table);
  createAndAppend('th', tr, { text: label });
  createAndAppend('td', tr, { text: value });
}

function renderLaureate(ul, { knownName: { en: name }, birth, death }) {
  const li = createAndAppend('li', ul);
  const table = createAndAppend('table', li);
  
  // Destructuring birth object
  const { date: birthDate, place: { locationString: { en: birthLocation } } } = birth; 
  if (death) {
    // Destructuring death object
    const { date: deathDate, place: { locationString: { en: deathLocation } } } = death;
    addTableRow(table, 'Name', name);
    addTableRow(table, 'Birth', `${birthDate}, ${birthLocation}`);
    addTableRow(table, 'Death', `${deathDate}, ${deathLocation}`);
  } else {
    addTableRow(table, 'Name', name);
    addTableRow(table, 'Birth', `${birthDate}, ${birthLocation}`);
  }
}

function renderLaureates(laureates) {
  const ul = document.createElement('ul');
  document.body.appendChild(ul);
  laureates.forEach((laureate) => renderLaureate(ul, laureate));
}

async function fetchAndRender() {
  try {
    const laureatesData = await getData(
      'https://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );
    const laureates = laureatesData.laureates;
    renderLaureates(laureates);
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
}

fetchAndRender();