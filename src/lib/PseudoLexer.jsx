import Parser from "./Parser";
import WordSynth from "./WordSynth";
import * as Tone from "tone";

/**
 * PseudoLexer.jsx
 * "Lexes" the user input, by interpreting special characters
 * and eventually code words.
 */
class PseudoLexer {
  constructor() {
    this.parser = new Parser();
    this.wordSynth = new WordSynth();
    this.wholeNote = Tone.Time("1n").toSeconds();
    this.wholeNoteTriplet = Tone.Time("1t").toSeconds();
    this.halfNote = Tone.Time("2n").toSeconds();
    this.halfNoteTriplet = Tone.Time("2t").toSeconds();
    this.quarterNote = Tone.Time("4n").toSeconds();
    this.quarterNoteTriplet = Tone.Time("4t").toSeconds();
    this.eightNote = Tone.Time("8n").toSeconds();
    this.eightNoteTriplet = Tone.Time("8t").toSeconds();
    this.sixteenthNote = Tone.Time("16n").toSeconds();
    this.sixteenthNoteTriplet = Tone.Time("16t").toSeconds();
    this.commands = {
      rootShiftNegative: "root-",
      rootShiftPositive: "root+",
    };
  }

  /**
   * Matches the separator with the appropriate time.
   * @param {Object} parsedWord parsed word from `Parser.jsx``
   * @returns time in `Tone.Time.toNotation()` form
   */
  interpretSeparator(parsedWord) {
    if (parsedWord.comma) return this.sixteenthNote;
    if (parsedWord.semicolon) return this.eightNote;
    if (parsedWord.colon) return this.eightNoteTriplet;
    if (parsedWord.punctuation) return this.halfNote;
    if (parsedWord.tripleDots) return this.wholeNote;
    if (parsedWord.exclamation) return this.quarterNoteTriplet;
    else return 0;
  }

  /**
   * Calculates the velocity of a note given the number of
   * upper-case letters and/or presence of exclamation mark.
   * @param {Object} parsedWord parsed word from `Parser.jsx`
   * @param {String} cleanWord word without special characters
   * @returns velocity
   */
  calculateVelocity(parsedWord, cleanWord) {
    let velocity = 0.5;
    if (parsedWord.exclamation) velocity += 0.2;
    velocity +=
      (cleanWord.match(/[A-Z]/g) || "").length / (cleanWord.length * 2);
    return velocity;
  }

  /**
   * Calculates the duration of a note depending on its length.
   * Returns in the `Tone.Time.toNotation()` form.
   * @param {String} cleanWord word without any special characters
   * @returns time in musical notation
   */
  calculateDuration(cleanWord) {
    if (cleanWord.length > 20) return "1n";
    else if (cleanWord.length > 10) return "2n";
    else if (cleanWord.length > 5) return "4n";
    else if (cleanWord.length > 3) return "8n";
    else if (cleanWord.length === 1) return "16n";
    else return "8n";
  }

  // TODO: paranthesis: this.containsParanthesis(word),
  // TODO: question: this.containsQuestionMark(word),

  /**
   * Interprets the input string. Checks for special characters and
   * consequently interprets their meaning.
   * @param {Array} userInput
   * @param {Array} scale
   * @param {Number} octave
   * @returns array of notes
   */
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
        .replace(/\d+/g, String(octave));
      offset = this.interpretSeparator(parsedInput[i]);
      result.push({
        word: word,
        time: rhythm,
        duration: this.calculateDuration(cleanWord),
        velocity: this.calculateVelocity(word, cleanWord),
        note: note,
      });
      rhythm += this.quarterNote + offset;
      offset = 0;
    }
    return result;
  }

  /**
   * Changes the speed of the notes. Larger values means extending
   * the timing, smaller means shortening the timing.
   * @param {Array} referenceNotes original notes that have not been modified
   * @param {Number} amount to scale the speed by
   * @returns array of notes with modified timing.
   */
  changeSpeed(referenceNotes, notes, amount) {
    let newNotes = [...notes];
    newNotes = newNotes.map((obj, index) => ({
      ...obj,
      note: notes[index].note,
      time: referenceNotes[index].time * amount,
    }));
    return newNotes;
  }
}

export default PseudoLexer;
