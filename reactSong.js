const reactReconciler = require("react-reconciler");
const Tone = require("tone");
const path = require("path");
const { exec } = require("child_process");
const flatten = require("lodash.flatten");

const getTone = (ast) => {
  if (ast.children.length > 0) {
    const { children, ...parent } = ast;
    return flatten([parent, ...children.map((child) => getTone(child))]);
  }

  return ast;
};

const play = (file) => {
  console.log(file);
  try {
    exec(`afplay ${file}`, () => {});
  } catch (err) {
    console.log(err);
  }
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
    if (type === "span") {
      return {
        file: "1.wav",
        children: [],
        delay: 500,
      };
    }

    if (type === "div") {
      return {
        file: "2.wav",
        children: [],
        delay: 200,
      };
    }
  },
  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstaneHandle
  ) {
    return {
      textToSpeechTrue: true,
      text,
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
  replaceContainerChildren(container, newChildren) {
    getTone(newChildren[0]).map((node, index) => {
      if (node.textToSpeechTrue) {
        // await speak(node.text);
      } else {
        setTimeout(() => play(path.join("wav", node.file)), node.delay * index);
      }
    });
  },
});

exports.render = (app) => {
  const container = reconciler.createContainer({}, false, false);
  reconciler.updateContainer(app, container, null, null);
};
