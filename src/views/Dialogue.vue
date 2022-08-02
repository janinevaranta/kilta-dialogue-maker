<script setup lang="ts">
import DynamicDialog from "primevue/dynamicdialog";
import Toast from "primevue/toast";

import DialogueNavBar from "../components/DialogueNavBar.vue";
import DialogueMessage from "../components/DialogueMessage.vue";
import DialogueInput from "../components/DialogueInput.vue";
import DialogueFileOpener from "../components/DialogueFileOpener.vue";
import DialogueExportSettings from "../components/DialogueExportSettings.vue";
import DialogueSettings from "../components/DialogueSettings.vue";

import { MessageStates, defaultDialogueSettings } from "../data";
import FileSaver from "file-saver";

import { ref, provide } from "vue";
import type { Ref } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";

interface DialogueSetting {
  name: string,
  description: string,
  defaultValue: any,
  currentValue: any,
}

interface MessageOptions {
  index?: number,
  author: string,
  content: string,
  position: string,
  effect?: string,
  state: MessageStates,
}

interface SaveConfig {
  version: number,
  content: Array<MessageOptions>,
}

const dialogueSettings: Ref<DialogueSetting[]> = ref([]);

// Try to load the settings from the local storage, if they exists.
// If not, load the default settings.
const savedSettings = localStorage.getItem("dialogueSettings");
if (savedSettings) {
  dialogueSettings.value = JSON.parse(savedSettings);
} else {
  dialogueSettings.value = defaultDialogueSettings;
  localStorage.setItem("dialogueSettings", JSON.stringify(dialogueSettings.value));
}

// Provide the settings globally for every child component.
provide("dialogueSettings", dialogueSettings);

const dialogueMessages: Ref<MessageOptions[]> = ref([]);
const currentMessageAction = ref(MessageStates.Normal);

const dialogueName = ref("new-dialogue");

const dialog = useDialog();
const toast = useToast();


function changeSettings(newSettings: DialogueSetting[]) {
  /**
   * Change any setting values provided in the parameters.
   * @param newSettings A new array of DialogueSetting objects to be applied.
   */

  dialogueSettings.value = newSettings;
}
function createMessage(opts: MessageOptions) {
  dialogueMessages.value.push(opts);
}
function deleteMessage(opts: {index: number}) {
  dialogueMessages.value.splice(opts.index, 1);
}
function startEditing(index: number) {
  /**
   * The user can only edit one message at a time
   * and they have to finish any other action as well.
   * This ensures that everything regarding messages works
   * correctly.
   */
  if (currentMessageAction.value == MessageStates.Normal) {
    currentMessageAction.value = MessageStates.IsEditing;
    dialogueMessages.value[index].state = MessageStates.IsEditing;
  }
}
function stopEditing(index: number, newAuthor: string, newContent: string, newPosition: string, newEffect?: string) {
  /**
   * Set the editted messages values to the new ones set by
   * the user.
   * Afterwards, reset the global action state and stop editing.
   */
  dialogueMessages.value[index].author = newAuthor;
  dialogueMessages.value[index].content = newContent;
  dialogueMessages.value[index].position = `dialogue-pos-${newPosition}`;
  dialogueMessages.value[index].effect = newEffect;
  dialogueMessages.value[index].state = MessageStates.Normal;

  // Reset the global action state.
  // Now the user can now start for example to edit another message.
  currentMessageAction.value = MessageStates.Normal;
}

function saveFile() {
  /**
   * Save the current dialogueMessages object as a JSON.
   * The user's browser should automatically start downloading
   * the new json file.
   */
  // Define some additional info to be included in the json.
  const saveConfig: SaveConfig = {
    version: 0.1,
    content: dialogueMessages.value,
  };

  // Create a blob object out of the JSON and save it.
  const blob = new Blob([JSON.stringify(saveConfig, null, 2)], {type: "application/json;charset=utf-8"});
  FileSaver.saveAs(blob, "dialogue.json");

  // Display a success message.
  toast.add({severity: "success", summary: "File Saved", detail: "File has been saved and should start downloading soon.", life: 5000});
}
function openFile() {
  /**
   * Open a loaded file.
   * The save file is first validated, after which 
   * the savefile message content is assigned to the dialogueMessages object.
   */
  dialog.open(DialogueFileOpener, {
    props: {
      header: "Open a saved dialogue file"
    },
    onClose: (json) => {
      const data = json?.data;
      if (data) {
        const loadedMessages = JSON.parse(data);
        try {
          dialogueMessages.value = loadedMessages.content;
          toast.add({severity: "success", summary: "File Opened", detail: "File has been opened successfully.", life: 5000});
        }
        catch (e) {
          console.log(e);
          toast.add({severity: "error", summary: "File Error", detail: "Something went wrong when opening the file.", life: 5000});
        }
      }
    }
  });
}
function openDialogueSettings() {
  dialog.open(DialogueSettings, {
    props: {
      header: "Dialogue Settings",
    }
  })
}
function openExportSettings() {
  dialog.open(DialogueExportSettings, {
    props: {
      header: "Export Settings",
    }
  })
}
</script>

<template>
  <Toast></Toast>
  <DynamicDialog></DynamicDialog>
  <div id="dialogue">
    <DialogueNavBar 
      :dialogue-name="dialogueName"
      @save-file="saveFile"
      @open-file="openFile"
      @open-dialogue-settings="openDialogueSettings"
      @open-export-settings="openExportSettings"
    />
    <div id="dialogue-controls">
      <div id="dialogue-content">
        <DialogueMessage 
          tabindex="0"
          v-for="(message, index) in dialogueMessages" 
          :index="index"
          :position="dialogueMessages[index].position" 
          :author="dialogueMessages[index].author"
          :content="dialogueMessages[index].content"
          :effect="dialogueMessages[index].effect"
          :state="dialogueMessages[index].state"
          @delete-message="deleteMessage"
          @start-edit="startEditing(index)"
          @stop-edit="stopEditing"
        />
      </div>
      <DialogueInput id="dialogue-input" @create-message="createMessage" />
    </div>
  </div>
</template>

<style scoped>
#dialogue {
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: #ffffff;
}
#dialogue:before {
  position: absolute;
  content: "";
  width: 100vw;
  height: 100vh;
  background-size: 2em 2em;
  background-image: linear-gradient(rgba(145, 194, 234, 0.1) .1em, transparent .1em), linear-gradient(90deg, rgba(145, 194, 234, .1) .05em, transparent .05em);
  -webkit-mask-image: radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
  mask-image: radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
}
#dialogue-controls {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
}
#dialogue-content {
  width: 70%;
  max-width: 870px;
  height: 100%;
  max-height: 615px;
  margin-left: auto;
  margin-right: auto;
  display: inline;
  overflow-y: scroll;
  scrollbar-width: none;
}
#dialogue-content::-webkit-scrollbar {
  display: none;
}
#dialogue-input {
  width: 70%;
  max-width: 870px;
  margin-left: auto;
  margin-right: auto;
}
</style>