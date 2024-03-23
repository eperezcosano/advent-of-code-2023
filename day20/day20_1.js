/*
*   --- Day 20: Pulse Propagation ---
*           --- Part One ---
*          Advent Of Code 2023
* */

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./day20.txt'),
});

let [lowPulses, highPulses] = [0, 0];
const cables = {};
const states = {};

function pressButton() {
  lowPulses++;
  states['broadcaster'].pulse = false;
  const pendingToProcess = ['broadcaster'];
  while (pendingToProcess.length) {
    const origin = pendingToProcess.shift();
    for (const cable of cables[origin]) {
      states[origin].pulse ? highPulses++ : lowPulses++;
      if (!states[cable]) continue;
      if (states[cable].type == '%' && !states[origin].pulse) {
        states[cable].active = !states[cable].active;
        states[cable].pulse = states[cable].active;
        pendingToProcess.push(cable);
      } else if (states[cable].type == '&') {
        states[cable].remembers[origin] = states[origin].pulse;
        states[cable].pulse = !Object.values(states[cable].remembers).every((val) => val);
        pendingToProcess.push(cable);
      }
    }
  }
}

lineReader.on('line', (line) => {
  const [input, dest] = line.split(' -> ');
  const output = dest.split(', ');
  cables[input == 'broadcaster' ? input : input.substring(1)] = output;
  states[input == 'broadcaster' ? input : input.substring(1)] = {
    type: input == 'broadcaster' ? input : input.substring(0, 1),
    pulse: null,
    active: false,
    remembers: {},
  };
});

lineReader.on('close', () => {
  for (const conj in states) {
    if (states[conj].type != '&') continue;
    for (const cable in cables) {
      if (cables[cable].includes(conj)) states[conj].remembers[cable] = false;
    }
  }
  for (let i = 0; i < 1000; i++) pressButton();
  const res = lowPulses * highPulses;
  console.log('Result:', res);
  // Result: 737679780
});
