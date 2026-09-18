const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function randomLetter(s) {
  let idx = Math.floor(Math.random() * s.length);
  return s[idx]
}

export const randomBoard5x5 = () => {
  let boggleDice = shuffle([
    "aaafrs","aaeeee","aafirs","adennn","aeeeem",
    "aeegmu","aegmnn","afirsy","bjkqxz","ccenst",
    "ceiilt","ceilpt","ceipst","ddhnot","dhhlor",
    "dhlnor","dhlnor","eiiitt","emottt","ensssu",
    "fiprsy","gorrvw","iprrry","nootuw","ooottu",
  ]);

  let board = [];
  for(let r = 0; r < 5; r++) {
    let row = [];
    for(let c = 0; c < 5; c++) {
      row.push(randomLetter(boggleDice[r * 5 + c].toUpperCase()));
    }
    board.push(row);
  }

  return board;
}