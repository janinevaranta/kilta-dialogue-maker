<script setup lang="ts">
import { ref, reactive, watch, defineEmits } from "vue";
import * as dialogueOptions from "../data";

const dialogueInput = ref("");

const dialogueOptionsSelected = reactive({
  position: "left",
  author: "",
  transition: "nothing",
});

const emit = defineEmits<{
  (e: "createMessage", opts: {author: string, content: string, position: string, effect: string}): void
}>();

function createMessage() {
  emit("createMessage", {
    author: dialogueOptionsSelected.author,
    content: dialogueInput.value,
    position: `dialogue-pos-${dialogueOptionsSelected.position}`,
    effect: dialogueOptionsSelected.transition,
  })
  dialogueInput.value = "";
}
</script>

<template>
  <div class="dialogue-input-content">
    <div class="dialogue-input-edit">
      <Toolbar class="dialogue-input-toolbar">
        <template #start>
          <Avatar class="dialogue-input-avatar" size="large" shape="circle" />
          <span>
            <p class="dropdown-label">Character:</p>
            <Dropdown v-model="dialogueOptionsSelected.author" :options="dialogueOptions.dialogueCharacters" placeholder="Choose a character" />
          </span>
          <span>
            <p class="dropdown-label">Position:</p>
            <Dropdown v-model="dialogueOptionsSelected.position" :options="dialogueOptions.dialoguePositions" />
          </span>
          <span>
            <p class="dropdown-label">Effect:</p>
            <Dropdown v-model="dialogueOptionsSelected.transition" :options="dialogueOptions.dialogueTransitionEffects" />
          </span>
        </template>
      </Toolbar>
      <Textarea class="dialogue-input-textarea" v-model="dialogueInput" :autoResize="true" rows="4" cols="80" @keyup.shift.enter="createMessage" />
    </div>
    <Button class="dialogue-input-submit p-button-rounded" @click="createMessage">Submit</Button>
  </div>
</template>

<style scoped>
.dialogue-input-content {
  display: flex;
  justify-content: center;
  gap: 15px;
  z-index: 1;
}
.dialogue-input-textarea {

}
.dialogue-input-avatar {
  margin-right: 15px;
}
.dialogue-input-submit {
  height: 50%;
  align-self: center;
}
.dropdown-label {
  margin: 0;
  text-align: left;
  font-size: 0.8em;
}
</style>