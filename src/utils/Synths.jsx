import * as Tone from "tone";

const AM_SYNTH = new Tone.AMSynth();
const DUO_SYNTH = new Tone.DuoSynth();
const MEMBRANE_SYNTH = new Tone.MembraneSynth();
const METAL_SYNTH = new Tone.MetalSynth();
const MONO_SYNTH = new Tone.MonoSynth();
const PLUCK_SYNTH = new Tone.PluckSynth();
const SYNTH = new Tone.Synth();

// TODO: Fix issue with using same synth twice!

export const synths = [
  { name: "AM", synth: AM_SYNTH },
  { name: "Duo", synth: DUO_SYNTH },
  { name: "Membrane", synth: MEMBRANE_SYNTH },
  { name: "Metal", synth: METAL_SYNTH },
  { name: "Mono", synth: MONO_SYNTH },
  { name: "Pluck", synth: PLUCK_SYNTH },
  { name: "Synth", synth: SYNTH },
];
