<script setup lang="ts">
import DialogueNavBar from "../components/DialogueNavBar.vue";
import DialogueMessage from "../components/DialogueMessage.vue";
import DialogueInput from "../components/DialogueInput.vue";

import { ref } from "vue";
import type { Ref } from "vue";

enum DialoguePosition {
  Left = "dialogue-pos-left",
  Right = "dialogue-pos-right",
}

interface MessageOptions {
  author: string,
  content: string,
  position: string,
}

const dialogueMessages: Ref<MessageOptions[]> = ref([]);

function createMessage(opts: MessageOptions) {
  dialogueMessages.value.push(opts)
  console.log(dialogueMessages.value);
}
</script>

<template>
  <div id="dialogue">
    <DialogueNavBar />
    <div id="dialogue-controls">
      <div id="dialogue-content">
        <DialogueMessage 
          v-for="(message, index) in dialogueMessages" 
          :position="dialogueMessages[index].position" 
          :author="dialogueMessages[index].author"
          :content="dialogueMessages[index].content"
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
  max-width: 70%;
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
  margin-left: auto;
  margin-right: auto;
  bottom: 0;
  z-index: 9999;
  position: fixed;
}
</style>