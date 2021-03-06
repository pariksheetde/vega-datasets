const fs = require('fs');
const dl = require('datalib');

function getRandomSubarray(arr, size) {
  let shuffled = arr.slice(0);
  let i = arr.length;
  let temp;
  let index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

function formatDate(d) {
  return `2001/${d.substring(0, 2)}/${d.substring(2, 4)} ${d.substring(4, 6)}:${d.substring(6, 8)}`;
}

const flights = dl.csv('data/flights-3m.csv', {
    parse: {date: 'string', 'delay': 'number', 'distance': 'number'}
});

const N = +process.argv[2] || 2000;
const fmt = dl.format.auto.number('s');

const randFlights = getRandomSubarray(flights, N).map(function(d) {
  return (d.date = formatDate(d.date), d);
});

fs.writeFileSync(`data/flights-${fmt(N)}.json`, JSON.stringify(randFlights));
