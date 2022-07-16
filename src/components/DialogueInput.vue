<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";

const dialogueAuthor = ref("Emericus");
const dialogueInput = ref("");

const emit = defineEmits<{
  (e: "createMessage", opts: {author: string, content: string, position: string}): void
}>();

function createMessage() {
  emit("createMessage", {author: dialogueAuthor.value, content: dialogueInput.value, position: "dialogue-pos-left"})
  dialogueInput.value = "";
}
</script>

<template>
  <div class="dialogue-input-content">
    <Avatar class="dialogue-input-avatar" size="xlarge" shape="circle" />
    <Textarea class="dialogue-input-textarea" v-model="dialogueInput" :autoResize="true" rows="5" cols="80" />
    <Button class="dialogue-input-submit p-button-rounded" @click="createMessage">Submit</Button>
  </div>
</template>

<style scoped>
.dialogue-input-content {
  display: flex;
  justify-content: center;
  gap: 15px;
}
.dialogue-input-textarea {

}
.dialogue-input-avatar {

}
.dialogue-input-submit {
}
</style>