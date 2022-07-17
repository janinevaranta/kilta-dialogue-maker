<script setup lang="ts">
import { ref, reactive, watch, defineEmits } from "vue";

const dialogueAuthor = ref("Emericus");
const dialogueInput = ref("");

const dialogueOptionsSelected = reactive({
  selectedPosition: "left",
})
const dialogueOptionsPosition = ref([
  "left",
  "right"
]);

const emit = defineEmits<{
  (e: "createMessage", opts: {author: string, content: string, position: string}): void
}>();

function createMessage() {
  emit("createMessage", {author: dialogueAuthor.value, content: dialogueInput.value, position: `dialogue-pos-${dialogueOptionsSelected.selectedPosition}`})
  dialogueInput.value = "";
}
</script>

<template>
  <div class="dialogue-input-content">
    <Avatar class="dialogue-input-avatar" size="xlarge" shape="circle" />
    <div class="dialogue-input-edit">
      <Toolbar class="dialogue-input-toolbar">
        <template #start>
          <Dropdown id="dialogue-position-selector" v-model="dialogueOptionsSelected.selectedPosition" :options="dialogueOptionsPosition"></Dropdown>
        </template>
      </Toolbar>
      <Textarea class="dialogue-input-textarea" v-model="dialogueInput" :autoResize="true" rows="4" cols="80" />
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

}
.dialogue-input-submit {
  height: 50%;
  align-self: center;
}
</style>