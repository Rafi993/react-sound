"use strict";
const React = require("react");

const GuitarBeats = ({ repeat }) => {
  return (
    <>
      <track channel={4} repeat={repeat} instrument="electronicGuitar">
        <note name="c1" />
        <note name="c4" />
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
