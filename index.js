const React = require("react");
const { render } = require("./reactSong");
const importJsx = require("import-jsx");

const ui = importJsx("./examples/mary_had_a_little_lamb");

render(React.createElement(ui), "test.midi");
