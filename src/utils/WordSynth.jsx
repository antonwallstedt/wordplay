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
      letterIndices.push(scale[this.alphabet.indexOf(letter)]);
    }

    if (letterIndices.length > 0) {
      // Reducing longer words to fewer (random) notes
      if (letterIndices.length > 3)
        letterIndices = this.shuffle(letterIndices).slice(0, Math.random() * 3);
      return letterIndices;
    }
  }

  parseInput(userInput, scale) {
    console.log(userInput);
    let inputNotes = [];
    for (const word of userInput.trim().split(" ")) {
      inputNotes.push(this.getNotes(word, scale));
    }
    return inputNotes;
  }
}

export default WordSynth;
