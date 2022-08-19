const React = require("react");
const { render } = require("./reactSong");
const importJsx = require("import-jsx");

const ui = importJsx("./ui");

render(React.createElement(ui));
