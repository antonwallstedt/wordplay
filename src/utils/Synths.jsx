import * as Tone from "tone";

const AM_SYNTH = () => {
  return new Tone.AMSynth();
};
const DUO_SYNTH = () => {
  return new Tone.DuoSynth();
};
const MEMBRANE_SYNTH = () => {
  return new Tone.MembraneSynth();
};
const METAL_SYNTH = () => {
  return new Tone.MetalSynth();
};
const MONO_SYNTH = () => {
  return new Tone.MonoSynth();
};
const PLUCK_SYNTH = () => {
  return new Tone.PluckSynth();
};
const SYNTH = () => {
  return new Tone.Synth();
};

// TODO: Fix issue with using same synth on multiple tracks!

export const synths = [
  { name: "AM", synth: AM_SYNTH() },
  { name: "Duo", synth: DUO_SYNTH() },
  { name: "Membrane", synth: MEMBRANE_SYNTH() },
  { name: "Metal", synth: METAL_SYNTH() },
  { name: "Mono", synth: MONO_SYNTH() },
  { name: "Pluck", synth: PLUCK_SYNTH() },
  { name: "Synth", synth: SYNTH() },
];
