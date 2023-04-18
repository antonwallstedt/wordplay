class Parser {
  /**
   * Takes in an input string, returns a list of objects with the cleaned-up word,
   * and flags indicating presences of comma, paranthesis, punctuation, semicolon, colon
   * exclamation mark and question mark. To be used by PseudoLexer.jsx for "interpreting"
   * programming in the string.
   * @param {String} inputString
   * @returns array of objects with parsed word and info about special characters
   */
  parseInput(inputString) {
    let words = inputString.split(" ");
    let result = [];
    for (var word of words) {
      result.push({
        word: this.tidyWord(word),
        comma: this.containsComma(word),
        paranthesis: this.containsParanthesis(word),
        punctuation: this.containsPunctuation(word),
        semicolon: this.containsSemicolon(word),
        colon: this.containsColon(word),
        exclamation: this.containsExcalamation(word),
        question: this.containsQuestionMark(word),
      });
    }
    return result;
  }

  /**
   * @param {String} word
   * @returns string devoid of special characters
   */
  tidyWord(word) {
    return word.replace(/[^a-zA-Z ]/g, "");
  }

  /**
   * @param {String} word
   * @returns boolean indicating presense of comma
   */
  containsComma(word) {
    return word.includes(",");
  }

  /**
   * @param {String} word
   * @returns boolean indicating presense of opening and closing paranthesis
   */
  containsParanthesis(word) {
    if (word.includes("(")) {
      return word.includes(")");
    } else {
      return false;
    }
  }

  /**
   * @param {String} word
   * @returns boolean indicating presence of punctuation
   */
  containsPunctuation(word) {
    return word.includes(".");
  }

  /**
   * @param {String} word
   * @returns boolean indicating presence of semicolon
   */
  containsSemicolon(word) {
    return word.includes(";");
  }

  /**
   * @param {String} word
   * @returns boolean indicating presence of colon
   */
  containsColon(word) {
    return word.includes(":");
  }

  /**
   * @param {String} word
   * @returns boolean indicating presence of exclamation mark
   */
  containsExclamation(word) {
    return word.includes("!");
  }

  /**
   * @param {String} word
   * @returns boolean indicating presence of question mark
   */
  containsQuestionMark(word) {
    return word.includes("?");
  }
}

export default Parser;
