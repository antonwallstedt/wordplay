import { describe, expect, it } from "vitest";
import ScaleGenerator from "../ScaleGenerator";

describe("Scale generation", () => {
  const scaleGenerator = new ScaleGenerator();
  it("should generate all scales successfully on valid input", async () => {
    expect(scaleGenerator.createScale("C", "Natural Minor")).toEqual([
      "C",
      "D",
      "Eb",
      "F",
      "G",
      "Ab",
      "Bb",
    ]);

    expect(scaleGenerator.createScale("D", "Harmonic Minor")).toEqual([
      "D",
      "E",
      "F",
      "G",
      "A",
      "Bb",
      "Db",
    ]);

    expect(scaleGenerator.createScale("E", "Minor Pentatonic")).toEqual([
      "E",
      "G",
      "A",
      "B",
      "D",
    ]);

    expect(scaleGenerator.createScale("F", "Major")).toEqual([
      "F",
      "G",
      "A",
      "Bb",
      "C",
      "D",
      "E",
    ]);

    expect(scaleGenerator.createScale("G", "Harmonic Minor")).toEqual([
      "G",
      "A",
      "Bb",
      "C",
      "D",
      "Eb",
      "Gb",
    ]);

    expect(scaleGenerator.createScale("A", "Major Pentatonic")).toEqual([
      "A",
      "B",
      "Db",
      "E",
      "Gb",
    ]);

    expect(scaleGenerator.createScale("Bb", "Dorian Mode")).toEqual([
      "Bb",
      "C",
      "Db",
      "Eb",
      "F",
      "G",
      "Ab",
    ]);

    expect(scaleGenerator.createScale("Db", "Locrian Mode")).toEqual([
      "Db",
      "D",
      "E",
      "Gb",
      "G",
      "A",
      "B",
    ]);

    expect(scaleGenerator.createScale("Eb", "Mixolydian Mode")).toEqual([
      "Eb",
      "F",
      "G",
      "Ab",
      "Bb",
      "C",
      "Db",
    ]);

    expect(scaleGenerator.createScale("Gb", "Phrygian Mode")).toEqual([
      "Gb",
      "G",
      "A",
      "B",
      "Db",
      "D",
      "E",
    ]);
  });

  it("should return false if root note isn't in the chromatic scale", async () => {
    expect(scaleGenerator.createScale("Z", "Harmonic Minor")).toBeFalsy();
    expect(scaleGenerator.createScale("O", "Locrian Mode")).toBeFalsy();
  });

  it("should return false if the scale is invalid", async () => {
    expect(scaleGenerator.createScale("C", "Invalid Scale")).toBeFalsy();
    expect(scaleGenerator.createScale("Z", "Hello World")).toBeFalsy();
  });
});

describe("Note mapping to alphabet", () => {
  const scaleGenerator = new ScaleGenerator();
  it("should return a mapping with length equal to alphabet length", async () => {
    expect(
      scaleGenerator.mapNotesToAlphabet(
        scaleGenerator.createScale("C", "Natural Minor")
      ).length
    ).toEqual("abcdefghijklmnopqrstuvwxyz".length);
    expect(
      scaleGenerator.mapNotesToAlphabet(
        scaleGenerator.createScale("A", "Minor Pentatonic")
      ).length
    ).toEqual("abcdefghijklmnopqrstuvwxyz".length);
  });

  it("should map the notes correctly to the alphabet", async () => {
    expect(
      scaleGenerator.mapNotesToAlphabet(
        scaleGenerator.createScale("C", "Major")
      )
    ).toEqual([
      "C",
      "D",
      "E",
      "F",
      "G",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
    ]);
  });

  it("should return false if scale is invalid", async () => {
    expect(scaleGenerator.mapNotesToAlphabet(0)).toBeFalsy();
  });
});

describe("Octave generation", () => {
  const scaleGenerator = new ScaleGenerator();
  const scale = scaleGenerator.createScale("C", "Major");
  const mapping = scaleGenerator.mapNotesToAlphabet(scale);

  it("should set the octave range correctly", async () => {
    const octaveMapping = scaleGenerator.mapOctave(mapping, 4);
    expect(octaveMapping).toEqual([
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
      "A4",
      "B4",
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
      "A4",
      "B4",
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
      "A4",
      "B4",
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
    ]);
  });

  it("should return false if note mapping failed", async () => {
    expect(scaleGenerator.mapOctave(0, 4)).toBeFalsy();
  });

  it("should return false if the octave is invalid", async () => {
    expect(scaleGenerator.mapOctave(0, "A")).toBeFalsy();
    expect(scaleGenerator.mapOctave(0, -1)).toBeFalsy();
  });
});
