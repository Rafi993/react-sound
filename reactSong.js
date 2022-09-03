const reactReconciler = require("react-reconciler");
const { exec } = require("child_process");
const fs = require("fs");
const Midi = require("jsmidgen");
const harmonics = require("harmonics");

const instruments = {
  organ: 0x13,
  electronicGuitar: 0x22,
  piano: 0x00,
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
    const node = {
      type: type.toLowerCase(),
      children: [],
      repeat: 1,
      delay: 0,
      channel: 0,
    };

    if (props.pitch) {
      node.pitch = props.pitch;
    } else if (type !== "track") {
      node.pitch = 64;
    }

    if (props.instrument) {
      node.instrument = props.instrument;
    }

    if (props.repeat) {
      node.repeat = props.repeat;
    }

    if (props.name) {
      node.name = props.name;
    }

    if (props.delay) {
      node.delay = props.delay;
    }

    if (props.channel) {
      node.channel = props.channel;
    }

    return node;
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

    newChildren.forEach((trackNode) => {
      const track = new Midi.Track();

      if (trackNode.instrument) {
        track.setInstrument(
          trackNode.channel,
          instruments[trackNode.instrument]
        );
      }

      midiFile.addTrack(track);

      for (let i = 0; i < trackNode.repeat; i++) {
        trackNode.children.forEach((node) => {
          if (node.type === "harmonics") {
            harmonics.scale(node.name).forEach((chord) => {
              track.addNote(0, chord, node.pitch, chord.delay);
            });
          } else if (node.type === "note") {
            track.addNote(trackNode.channel, node.name, node.pitch, node.delay);
          }
        });
      }
    });

    fs.writeFileSync(file, midiFile.toBytes(), "binary");
    exec(`open ${file}`, () => {});
  },
});

exports.render = (app, file) => {
  const container = reconciler.createContainer(file, false, false);
  reconciler.updateContainer(app, container, null, null);
};
