// All constant data that can be used in the options.

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

interface DialogueSetting {
  name: string,
  description: string,
  defaultValue: string[],
  currentValue: string[],
}

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

const dialoguePositions = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
];

const defaultDialogueSettings = [{
  name: "Characters",
  description: "List of characters that can appear in the dialogues.",
  defaultValue: dialogueCharacters,
  currentValue: dialogueCharacters,
},
{
  name: "Positions",
  description: "List of positions that can be set for each character.",
  defaultValue: dialoguePositions,
  currentValue: dialoguePositions,
},
{
  name: "Effects",
  description: "List of effects that can be set for each message.",
  defaultValue: dialogueTransitionEffects,
  currentValue: dialogueTransitionEffects,
}];

export { 
  dialoguePositions,
  dialogueCharacters,
  dialogueTransitionEffects,
  defaultDialogueSettings,
  MessageStates,
  DialoguePositionClass,
}

export type {
  DialogueSetting
}
