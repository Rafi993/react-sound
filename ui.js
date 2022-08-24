"use strict";
const React = require("react");

const App = () => (
  <>
    <track repeat={3}>
      <node name="b2" />
      <node name="b2" />
      <note name="b2" />
      <note name="b2" />
      <note name="b2" />
      <note name="b2" />
      <note name="c3" />
      <harmonics name="c4 bebop" />
    </track>

    <track>
      <harmonics name="b4 major" />
    </track>
  </>
);

module.exports = App;
