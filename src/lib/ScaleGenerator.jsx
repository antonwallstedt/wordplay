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
   * @param {Array} scale the scale to pick notes from
   * @returns an array of length 26 with only notes from the given scale
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

  /**
   * Creates the complete mapping, i.e. an array of length 26
   * where each note also contains the octave number.
   *
   * @param {String} rootNote the rootnote of the mapping
   * @param {String} scale the scale to use for the mapping
   * @param {Number} octave the octave to map to the notes
   * @returns an array of notes with octave number
   */
  createMapping(rootNote, scale, octave) {
    return this.mapOctave(
      this.mapNotesToAlphabet(this.createScale(rootNote, scale)),
      octave
    );
  }

  /**
   * Getter for the scales available to use.
   * @returns array of scales
   */
  getScales() {
    return this.scaleDegrees.map((obj) => Object.keys(obj)[0]);
  }

  /**
   * Gets the chromatic scale.
   * @returns an array of the the chromatic notes (i.e. 12 notes)
   */
  getChromaticScale() {
    return this.chromatic;
  }

  /**
   * Setter for the octave in the mapping.
   * @param {Array} mapping the mapping to set the octave for
   * @param {Number} newOctave the new octave number to set
   * @returns an array of the mapping with the new octave
   */
  setOctave(mapping, newOctave) {
    let newMapping = [...mapping];
    for (let i = 0; i < mapping.length; i++) {
      newMapping[i].note = newMapping[i].note.replace(
        /\d+/g, // Regex for replacing only the number in the string
        String(newOctave)
      );
    }
    return newMapping;
  }

  stripOctaves(notes) {
    return [...notes].map((note) => note.replace(/\d+/g, ""));
  }

  shiftRoot(referenceNotes, newRoot, scaleNotes, octave) {
    let newRootIndex = scaleNotes.indexOf(newRoot);
    let notes = this.stripOctaves(referenceNotes.map((obj) => obj.note));
    let newMapping = notes.map((note) => {
      // Offset new notes by how far away the new root note is from the original root note.
      let currentNoteIndex = scaleNotes.indexOf(note);
      let newNoteIndex = (currentNoteIndex + newRootIndex) % scaleNotes.length;
      return scaleNotes[newNoteIndex];
    });
    return this.mapOctave(newMapping, Number(octave));
  }
}

export default ScaleGenerator;
