import Parser from "./Parser";
import WordSynth from "./WordSynth";

class PseudoLexer {
  constructor() {
    this.parser = new Parser();
    this.wordSynth = new WordSynth();
  }

  interpret(userInput) {
    let parsedInput = this.parser.parseInput(userInput);
    let result = [];
    let offset = 0;
    let rhythm = 0;
    for (var i = 0; i < parsedInput.length; i++) {
      let word = parsedInput[i].word;
      if (parsedInput[i].comma) offset += 0.125;
      if (parsedInput[i].semicolon) offset += 0.25;
      if (parsedInput[i].punctuation) offset += 0.5;
      if (parsedInput[i].paranthesis) {
        for (var i = 0; i < parsedInput[i].cleanWord.length; i++) {
          result.push({ word: letter, time: rhythm });
        }
      } else {
        result.push({ word: word, time: rhythm });
      }
      rhythm += offset + 0.25;
    }
    return result;
  }
}
