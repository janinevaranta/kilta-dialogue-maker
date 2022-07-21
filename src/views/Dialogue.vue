<script setup lang="ts">
import DialogueNavBar from "../components/DialogueNavBar.vue";
import DialogueMessage from "../components/DialogueMessage.vue";
import DialogueInput from "../components/DialogueInput.vue";
import { MessageStates } from "../data";

import { ref } from "vue";
import type { Ref } from "vue";

enum DialoguePosition {
  Left = "dialogue-pos-left",
  Right = "dialogue-pos-right",
}

interface MessageOptions {
  index?: number,
  author: string,
  content: string,
  position: string,
  effect?: string,
  state: MessageStates,
}

const dialogueMessages: Ref<MessageOptions[]> = ref([]);

const swapInitIndex = ref(0);

function createMessage(opts: MessageOptions) {
  dialogueMessages.value.push(opts);
}
function deleteMessage(opts: {index: number}) {
  dialogueMessages.value.splice(opts.index, 1);
}
function startEditing(index: number) {
  dialogueMessages.value[index].state = MessageStates.IsEditing;
}
function stopEditing(index: number, newAuthor: string, newContent: string, newPosition: string, newEffect?: string) {
  dialogueMessages.value[index].author = newAuthor;
  dialogueMessages.value[index].content = newContent;
  dialogueMessages.value[index].position = newPosition;
  dialogueMessages.value[index].effect = newEffect;
  dialogueMessages.value[index].state = MessageStates.Normal;
}
// function startSwap(index: number) {
//   // Save the index of the caller to a variable for later use.
//   swapInitIndex.value = index;
//   // Set each message elements state to be swappable (except the one which initiated the swap).
//   dialogueMessages.value.forEach((message: MessageOptions, i) => {
//     index != i ? message.state = MessageStates.IsSwapTarget : MessageStates.IsSwapping;
//   });
// }
// function endSwap(index: number) {
//   const swapTarget = dialogueMessages.value[index];
//   dialogueMessages.value[index] = dialogueMessages.value[swapInitIndex.value];
//   dialogueMessages.value[swapInitIndex.value] = swapTarget;
//   // Reset states and values.
//   dialogueMessages.value.forEach((message: MessageOptions) => {
//     message.state = MessageStates.Normal;
//   });
//   swapInitIndex.value = 0;
// }
</script>

<template>
  <div id="dialogue">
    <DialogueNavBar />
    <div id="dialogue-controls">
      <div id="dialogue-content">
        <DialogueMessage 
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
      <DialogueInput class="dialogue-input" @create-message="createMessage" />
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
</style>