<script setup lang="ts">
import { ref } from "vue";

const dialogueStartStructure = ref("");
const messageStructure = ref("");
const dialogueEndStructure = ref("");

// Define the regex strings.
// These will be used to search for a match in
// the dialogue export settings.
const messageContentRegex = {
  author: "(\/\/AUTHOR\/\/)",
  effect: "(\/\/EFFECT\/\/)",
  position: "(\/\/POSITION\/\/)",
  number: "(\/\/NUMBER\/\/)",  
}

</script>

<template>
  <div class="dialog-container">
    <h5>Dialogue Start</h5>
    <Textarea v-model="dialogueStartStructure" rows="5" cols="30" :auto-resize="true" />
    <h5>Message Output</h5>
    <Textarea v-model="messageStructure" rows="5" cols="30" :auto-resize="true" />
    <h5>Dialogue End</h5>
    <Textarea v-model="dialogueEndStructure" rows="5" cols="30" :auto-resize="true" />
  </div>
</template>

<style scoped>

.dialog-container {
  width: 80vw;
}

</style>