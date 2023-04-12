class WordSynth {
  constructor() {
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
  }

  /**
   * Shuffles an array using the Fisher-Yates shuffle algorithm.
   * @param {Array} array to shuffle
   * @returns shuffled array
   */
  shuffle(array) {
    let j, x, i;
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  }

  /**
   * Gets a note from the given scale.
   * @param {String} word to convert to a note
   * @param {Array} scale to get the note from
   * @returns {String} the note
   */
  getNote(word, scale) {
    let letterIndices = [];
    for (const letter of word) {
      letterIndices.push(this.alphabet.indexOf(letter));
    }
    let note =
      scale[
        Math.floor(letterIndices.reduce((a, b) => a + b) / letterIndices.length)
      ];
    return note;
  }

  /**
   * Returns a list of objects containing the converted note and length of the word.
   * More information to be added, such as the rhythm and effects.
   * @param {String} userInput
   * @param {Array} scale
   */
  // TODO: Add support for specifying rhythm yourself.
  parseInput(userInput, scale) {
    let inputNotes = [];
    for (const word of userInput.trim().split(" ")) {
      inputNotes.push({ len: word.length, note: this.getNote(word, scale) });
    }
    return inputNotes;
  }
}

export default WordSynth;
