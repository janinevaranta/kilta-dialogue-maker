<script setup lang="ts">
import { ref, inject, onMounted, defineEmits } from "vue";
import { defaultDialogueSettings } from "../data/index.js";

import type { Ref } from "vue";
import type { DialogueSetting } from "../data/index.js";
import type { DynamicDialogInstance } from "primevue/dynamicdialogoptions";

// Initialize the PrimeVue provided dialogRef variable.
// This can be later used to close the dialog.
const dialogRef = inject<DynamicDialogInstance>("dialogRef");

// Initialize the different setting values.
// All values are expected to be strings.
const dialogueCharacters: Ref<string[]> = ref([]);
const dialoguePositions: Ref<string[]> = ref([]);
const dialogueEffects: Ref<string[]> = ref([]);

// Load the global configurations, set initially in the parent component.
const dialogueSettings = inject<{characters?: DialogueSetting, positions?: DialogueSetting, effects?: DialogueSetting}>("dialogueSettings", defaultDialogueSettings);

onMounted(() => {
  dialogueCharacters.value = dialogueSettings.value.characters.currentValue;
  dialoguePositions.value = dialogueSettings.value.positions.currentValue;
  dialogueEffects.value = dialogueSettings.value.effects.currentValue;
});

function saveSettings() {
  /**
   * Emit saved settings and close the dialog window.
   */
  if (dialogRef) {
    dialogRef.value.close({
      characters: dialogueCharacters.value, 
      positions: dialoguePositions.value, 
      effects: dialogueEffects.value
    })
  }
}

</script>

<template>
  <div class="dialog-container">
    <p>Characters</p>
    <Chips v-model="dialogueCharacters" />
    <p>Positions</p>
    <Chips v-model="dialoguePositions" />
    <p>Effects</p>
    <Chips v-model="dialogueEffects" />
    <br>
    <br>
    <Button label="Save Settings" @click="saveSettings" />
  </div>
</template>

<style scoped>

.dialog-container {
  width: 80vw;
}

</style>