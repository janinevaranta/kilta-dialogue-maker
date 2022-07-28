// All constant data that can be used in the options.

const dialogueCharacters = [
  "Guildmaster",
  "Emericus",
  "Velia",
  "Kho",
  "Dalton",
  "Maryu",
  "R.A.G.A",
  "Solia",
  "Pyroarix",
];
const dialogueTransitionEffects = [
  "nothing",
  "shake",
  "jump",
];

enum MessageStates {
  Normal,
  // Set if "Change Order" options is pressed.
  // The element will swap with the next selected one in position in the dialogue chain.
  IsSwapping,
  // Set once an other message is set to "isSwapping" state.
  IsSwapTarget,
  // Set if the message is being editted.
  IsEditing,
};

enum DialoguePositionClass {
  Left = "dialogue-pos-left",
  Right = "dialogue-pos-right",
}

const dialoguePositions = [
  "left",
  "right"
];

export { dialoguePositions, dialogueCharacters, dialogueTransitionEffects, MessageStates, DialoguePositionClass }
