/**
 * Function component library for synthesising sound from words.
 */

function WordSynth() {
  /**
   * Shuffles array in place using the Fisher-Yates algorithm.
   * @param {Array} array
   * @returns {Array} shuffled array
   */
  const shuffle = (a) => {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  /**
   * Converts a string into notes.
   * @param {String} word
   * @returns {Array} array of notes
   */
  const getNotes = (word) => {
    let letterIndices = [];
    for (const letter of word.split("")) {
      letterIndices.push(scale[alphabet.indexOf(letter)]);
    }

    if (letterIndices.length > 0) {
      // Reducing longer words to fewer (random) notes
      if (letterIndices.length > 3)
        letterIndices = shuffle(letterIndices).slice(0, Math.random() * 3);
      return letterIndices;
    }
  };

  /**
   * Takes in the user input and converts each input to an array of notes.
   * @param {Array} userInput
   * @returns array of notes
   */
  const parseInput = (userInput) => {
    // Users may have supplied multiple tracks, so we
    // parse each track separately and store in a 2D array.
    let userInputList = [];
    for (const input of userInput) {
      userInputList.push(input.toLowerCase().split(" "));
    }

    // Take each input and map to current scale
    let notes = [];
    for (const inputWords of userInputList) {
      let inputNotes = [];
      for (const word of inputWords) {
        if (word) inputNotes.push(getNotes(word)); // TODO: Assertion on mapScale
      }
      notes.push(inputNotes);
    }
    return notes;
  };
}

export default WordSynth;
