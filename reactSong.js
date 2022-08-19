const reactReconciler = require("react-reconciler");
const path = require("path");
const { exec } = require("child_process");
const flatten = require("lodash.flatten");
const fs = require("fs");
const Midi = require("jsmidgen");

const getTone = (ast) => {
  if (ast.children.length > 0) {
    const { children, ...parent } = ast;
    return flatten([parent, ...children.map((child) => getTone(child))]);
  }

  return ast;
};

const reconciler = reactReconciler({
  supportsPersistence: true,
  createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstaneHandle
  ) {
    return {
      type: type.toLowerCase(),
      children: [],
      pitch: 64,
    };
  },
  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstaneHandle
  ) {
    return {
      node: "c4",
      children: [],
    };
  },
  appendInitialChild(parent, child) {
    parent.children.push(child);
  },
  commitUpdate(domElement, updatePayload, type, oldProps, newProps) {},
  removeChildFromContainer(container, child) {},
  removeChild(parent, child) {},
  insertInContainerBefore(container, child, before) {},
  insertBefore(container, child, before) {},
  prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    currentHostContext
  ) {},
  commitTextUpdate(textInstance, oldText, newText) {},

  finalizeInitialChildren() {},
  getChildHostContext() {},
  getPublicInstance() {},
  getRootHostContext() {},
  prepareForCommit() {},

  resetAfterCommit() {},
  shouldSetTextContent() {},
  clearContainer(container) {},
  createContainerChildSet() {
    return [];
  },
  appendChildToContainerChildSet(childSet, child) {
    childSet.push(child);
  },
  finalizeContainerChildren() {},
  replaceContainerChildren(file, newChildren) {
    const midiFile = new Midi.File();
    const track = new Midi.Track();
    midiFile.addTrack(track);

    getTone(newChildren[0]).forEach((node, index) => {
      track.addNote(0, node.type, node.pitch);
    });

    fs.writeFileSync(file, midiFile.toBytes(), "binary");
    exec(`open ${file}`, () => {});
  },
});

exports.render = (app, file) => {
  const container = reconciler.createContainer(file, false, false);
  reconciler.updateContainer(app, container, null, null);
};
