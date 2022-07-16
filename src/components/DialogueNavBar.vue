<script setup lang="ts">
import { ref } from "vue";

const items = ref([
  {
    label: "Back",
    icon: "pi pi-arrow-left",
  },
])
</script>

<template>
  <nav>
    <Toolbar class="editor-navbar">
      <template #start>
        <Button label="Back" icon="pi pi-arrow-left" />
      </template>
      <template #end>
        <Button label="Dialogue Settings" class="p-button-rounded" />
      </template>
    </Toolbar>
  </nav>
</template>

<style scoped>
</style>