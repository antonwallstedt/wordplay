import Parser from "./Parser";
import WordSynth from "./WordSynth";

class PseudoLexer {
  constructor() {
    this.parser = new Parser();
    this.wordSynth = new WordSynth();
  }

  interpretSeparator(parsedWord) {
    if (parsedWord.comma) return 0.25;
    if (parsedWord.punctuation) return 0.5;
    if (parsedWord.tripleDots) return 1;
    if (parsedWord.semicolon) return 0.33;
    if (parsedWord.colon) return 0.75;
    if (parsedWord.exclamation) return 0.33;
    else return 0;
  }

  calculateVelocity(parsedWord, cleanWord) {
    let velocity = 0.5;
    if (parsedWord.exclamation) velocity += 0.2;
    velocity +=
      (cleanWord.match(/[A-Z]/g) || "").length / (cleanWord.length * 2);
    return velocity;
  }

  calculateDuration(cleanWord) {
    if (cleanWord.length > 20) return "1n";
    else if (cleanWord.length > 10) return "2n";
    else if (cleanWord.length > 5) return "4n";
    else if (cleanWord.length > 3) return "8n";
    else if (cleanWord.length === 1) return "16n";
    else return "8n";
  }

  // paranthesis: this.containsParanthesis(word),
  // question: this.containsQuestionMark(word),

  interpret(userInput, scale, octave) {
    let parsedInput = this.parser.parseInput(userInput);
    let result = [];
    let offset = 0;
    let rhythm = 0;
    for (var i = 0; i < parsedInput.length; i++) {
      let word = parsedInput[i].word;
      let cleanWord = parsedInput[i].cleanWord;
      let note = this.wordSynth
        .getNote(cleanWord, scale)
        .replace(/\d+/g, String(octave)); // Must replace default octave with individual octave
      offset = this.interpretSeparator(parsedInput[i]);
      result.push({
        word: word,
        duration: this.calculateDuration(cleanWord),
        velocity: this.calculateVelocity(word, cleanWord),
        note: note,
        time: rhythm,
      });
      rhythm += 0.25 + offset;
      offset = 0;
    }
    return result;
  }
}

export default PseudoLexer;
