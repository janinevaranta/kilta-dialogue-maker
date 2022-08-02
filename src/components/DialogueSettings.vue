<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import { defaultDialogueSettings } from "../data/index.js";

import type { Ref } from "vue";
import type { DialogueSetting } from "../data/index.js";

// Initialize the different setting values.
// All values are expected to be strings.
const dialogueCharacters: Ref<string[]> = ref([]);
const dialoguePositions: Ref<string[]> = ref([]);
const dialogueEffects: Ref<string[]> = ref([]);

// Load the global configurations, set initially in the parent component.
const dialogueSettings = inject<DialogueSetting[]>("dialogueSettings", defaultDialogueSettings);

onMounted(() => {
  dialogueCharacters.value = dialogueSettings.value[0].currentValue;
  dialoguePositions.value = dialogueSettings.value[1].currentValue;
  dialogueEffects.value = dialogueSettings.value[2].currentValue;
});
</script>

<template>
  <div class="dialog-container">
    <p>Characters</p>
    <Chips v-model="dialogueCharacters" />
    <p>Positions</p>
    <Chips v-model="dialoguePositions" />
    <p>Effects</p>
    <Chips v-model="dialogueEffects" />
  </div>
</template>

<style scoped>

.dialog-container {
  width: 80vw;
}

</style>