'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-4-dice-race

1. Complete the function `rollDice()` by using `.map()` on the `dice` array 
   to create an array of promises for use with `Promise.race()`.
2. Refactor the function `main()` using async/await and try/catch.
3. Once you got this working, you may observe that some dice continue rolling 
   for some undetermined time after the promise returned by `Promise.race()` 
   resolves. Do you know why? Add your answer as a comment to the bottom of the 
   file.
------------------------------------------------------------------------------*/
const rollDie = require('../../helpers/pokerDiceRoller');

function rollDice() {
  const dice = [1, 2, 3, 4, 5];
  const promises = dice.map(() => rollDie());
  return Promise.race(promises);
}


async function main() {
  try {
    const results = await rollDice();
    console.log('Resolved!', results);
  } catch (error) {
    console.log('Rejected!', error.message);
  }
}


if (process.env.NODE_ENV !== 'test') {
  main();
}
module.exports = rollDice;




/*The rollDie() function creates a promise that resolves after a random delay.
When Promise.race() is used, it resolves with the result of the first promise 
in the promises array that fulfills or rejects. However, even after one of 
the promises resolves, the other promises created by rollDie() may still 
be in a pending state, continuing to execute. This is why you may observe 
some dice continuing to roll for an undetermined time after the Promise.race() 
resolves.*/