import Parser from "./Parser";
import WordSynth from "./WordSynth";

class PseudoLexer {
  constructor() {
    this.parser = new Parser();
    this.wordSynth = new WordSynth();
  }

  interpret(userInput, scale, octave) {
    let parsedInput = this.parser.parseInput(userInput);
    let result = [];
    let offset = 0;
    let rhythm = 0;
    for (var i = 0; i < parsedInput.length; i++) {
      let word = parsedInput[i].word;
      let cleanWord = parsedInput[i].cleanWord;
      if (parsedInput[i].comma) offset = 0.25;
      if (parsedInput[i].semicolon) offset = 0.33;
      if (parsedInput[i].punctuation) offset = 0.5;
      result.push({
        word: word,
        duration: cleanWord.length / 20,
        velocity:
          0.5 + (cleanWord.match(/[A-Z]/g) || "").length / cleanWord.length,
        note: this.wordSynth.getNote(cleanWord, scale).replace(
          /\d+/g, // Regex for replacing only the number in the string
          String(octave)
        ),
        time: rhythm,
      });
      rhythm += 0.25 + offset;
      offset = 0;
    }
    return result;
  }
}

export default PseudoLexer;
