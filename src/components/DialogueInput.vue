<script setup lang="ts">
import { ref, reactive, watch, defineEmits } from "vue";
import { useToast } from "primevue/usetoast";
import * as dialogueOptions from "../data";

const toast = useToast();

const dialogueInput = ref("");

const dialogueOptionsSelected = reactive({
  position: "1",
  author: "",
  transition: "nothing",
});

const emit = defineEmits<{
  (e: "createMessage", opts: {author: string, content: string, position: string, effect: string, state: dialogueOptions.MessageStates}): void
}>();

function createMessage() {
  /**
   * Emit the properties of the new message to the parent component
   * and reset the initial value of the input back to empty.
   */
  if (dialogueOptionsSelected.author == "") {
    toast.add({severity: "warn", summary: "Empty Author", detail: "Please select an author for the message.", life: 5000});
    return;
  } else if (dialogueInput.value.trim() == "") {
    toast.add({severity: "warn", summary: "Empty Input", detail: "Message input cannot be empty.", life: 5000});
    return;
  }
  emit("createMessage", {
    author: dialogueOptionsSelected.author,
    content: dialogueInput.value.trim(),
    position: `dialogue-pos-${dialogueOptionsSelected.position}`,
    effect: dialogueOptionsSelected.transition,
    state: dialogueOptions.MessageStates.Normal,
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
          <span class="dialogue-input-setting">
            <p class="dropdown-label">Character:</p>
            <Dropdown v-model="dialogueOptionsSelected.author" :options="dialogueOptions.dialogueCharacters" placeholder="Choose a character" />
          </span>
          <span class="dialogue-input-setting">
            <p class="dropdown-label">Position:</p>
            <Dropdown v-model="dialogueOptionsSelected.position" :options="dialogueOptions.dialoguePositions" />
          </span>
          <span class="dialogue-input-setting">
            <p class="dropdown-label">Effect:</p>
            <Dropdown v-model="dialogueOptionsSelected.transition" :options="dialogueOptions.dialogueTransitionEffects" />
          </span>
        </template>
      </Toolbar>
      <Textarea class="dialogue-input-textarea" v-model="dialogueInput" :autoResize="true" rows="4" cols="80" @keyup.enter="createMessage" />
    </div>
    <Button icon="pi pi-reply" class="dialogue-input-submit p-button-rounded p-button-text" @click="createMessage" />
  </div>
</template>

<style scoped>
.dialogue-input-content {
  display: flex;
  justify-content: flex-end;
  z-index: 1;
}
.dialogue-input-setting {
  margin-right: 10px;
}
.dialogue-input-avatar {
  margin-right: 15px;
}
.dialogue-input-submit {
  height: 50%;
  align-self: center;
  position: relative;
  left: -40px;
  top: 70px;
}
.dropdown-label {
  margin: 0;
  text-align: left;
  font-size: 0.8em;
}
</style>