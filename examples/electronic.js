"use strict";
const React = require("react");

const GuitarBeats = ({ repeat }) => {
  return (
    <>
      <track channel={4} repeat={repeat} instrument="electronicGuitar">
        <note name="B1" />
        <note name="B2" />
        <note name="c1" />
        <note name="c2" />
        <note name="c3" />
        <note name="c4" />
        <note name="c5" />
        <note name="g1" />
        <note name="g2" />
        <note name="g3" />
        <note name="g4" />
      </track>
    </>
  );
};

const ElectronicBeat = () => {
  return (
    <>
      <GuitarBeats repeat={10} />
    </>
  );
};

module.exports = ElectronicBeat;
