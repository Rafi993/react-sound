"use strict";
const React = require("react");

const Song0 = () => {
  return (
    <>
      <track repeat={1}>
        <note name="E4" />
        <note name="D4" />
        <note name="C4" />

        <note name="D4" />
        <note name="E4" />
        <note name="E4" />
        <note name="E4" />

        <note name="D4" delay={60} />
        <note name="D4" />
        <note name="D4" />
        <note name="E4" delay={60} />
        <note name="G4" />
        <note name="G4" />

        <note name="E4" />
        <note name="D4" />
        <note name="C4" />
        <note name="D4" />
        <note name="E4" />
        <note name="E4" />
        <note name="E4" />

        <note name="E4" />
        <note name="D4" />
        <note name="D4" />
        <note name="E4" />
        <note name="D4" />
        <note name="C4" />
      </track>
    </>
  );
};

module.exports = Song0;
