class ScaleGenerator {
  constructor() {
    this.chromatic = [
      "C",
      "Db",
      "D",
      "Eb",
      "E",
      "F",
      "Gb",
      "G",
      "Ab",
      "A",
      "Bb",
      "B",
    ];

    this.scaleDegrees = [
      { "Natural Minor": [0, 2, 3, 5, 7, 8, 10] },
      { "Harmonic Minor": [0, 2, 3, 5, 7, 8, 11] },
      { "Minor Pentatonic": [0, 3, 5, 7, 10] },
      { Major: [0, 2, 4, 5, 7, 9, 11] },
      { "Harmonic Major": [0, 2, 4, 5, 7, 8, 11] },
      { "Major Pentatonic": [0, 2, 4, 7, 9] },
      { "Dorian Mode": [0, 2, 3, 5, 7, 9, 10] },
      { "Locrian Mode": [0, 1, 3, 5, 6, 8, 10] },
      { "Lydian Mode": [0, 2, 4, 6, 7, 9, 11] },
      { "Mixolydian Mode": [0, 2, 4, 5, 7, 9, 10] },
      { "Phrygian Mode": [0, 1, 3, 5, 7, 8, 10] },
    ];

    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
    this.scale = [];
  }

  /**
   * Takes in a root note as a string and the scale as a string.
   * Returns the notes of that scale starting from the root note
   * as an array of strings.
   *
   * @param {String} rootNote
   * @param {String} scale
   * @returns array of notes
   */
  createScale(rootNote, scale) {
    if (
      this.chromatic.includes(rootNote) &&
      this.scaleDegrees.some((obj) => Object.keys(obj).includes(scale))
    ) {
      let rootNoteIndex = this.chromatic.indexOf(rootNote);
      let degrees = this.scaleDegrees.find((obj) => scale in obj)[scale];
      let notes = [];
      for (var deg of degrees) {
        notes.push(
          this.chromatic[(rootNoteIndex + deg) % this.chromatic.length]
        );
      }
      this.scale = notes;
      return notes;
    } else {
      return 0;
    }
  }

  /**
   * Takes in array of notes from a scale and returns an array
   * of notes with a size equal to the alphabet length. This array
   * can then be used to map the user input to notes.
   *
   * @param {Array} scale
   * @returns
   */
  mapNotesToAlphabet(scale) {
    let noteMapping = [];
    if (scale) {
      for (var i = 0; i < this.alphabet.length; i++) {
        noteMapping.push(scale[i % scale.length]);
      }
      return noteMapping;
    } else {
      return 0;
    }
  }

  /**
   * Maps the octave to the notes.
   *
   * @param {Array} noteMapping
   * @param {Number} octave
   * @returns notes but with octaves added
   */
  mapOctave(noteMapping, octave) {
    if (typeof octave !== "number") return 0;
    if (noteMapping && octave >= 0) {
      return noteMapping.map((note) => note + octave);
    } else {
      return 0;
    }
  }

  createMapping(rootNote, scale, octave) {
    return this.mapOctave(
      this.mapNotesToAlphabet(this.createScale(rootNote, scale)),
      octave
    );
  }

  getScales() {
    return this.scaleDegrees.map((obj) => Object.keys(obj)[0]);
  }

  getChromaticScale() {
    return this.chromatic;
  }

  setOctave(mapping, newOctave) {
    let newMapping = mapping;
    for (let i = 0; i < mapping.length; i++) {
      newMapping[i].note = newMapping[i].note.replace(
        /\d+/g,
        String(newOctave)
      );
    }
    return newMapping;
  }
}

export default ScaleGenerator;
