/**
 * Class component for synthesising sounds from words
 */

class WordSynth {
  constructor() {
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
  }

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

  getNotes(word, scale) {
    let letterIndices = [];
    for (const letter of word) {
      console.log(scale[this.alphabet.indexOf(letter)]);
      letterIndices.push(this.alphabet.indexOf(letter));
    }
    return scale[
      Math.floor(
        // Average the indices and return one note
        letterIndices.reduce((a, b) => a + b) / letterIndices.length
      )
    ];
  }

  parseInput(userInput, scale) {
    let inputNotes = [];
    for (const word of userInput.trim().split(" ")) {
      inputNotes.push(this.getNotes(word, scale));
    }
    return inputNotes;
  }
}

export default WordSynth;
