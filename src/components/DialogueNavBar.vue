<script setup lang="ts">
import { FileUploadRemoveEvent } from "primevue/fileupload";
import { ref, defineProps, defineEmits, onMounted } from "vue";

const exportItems = ref([
  {
    label: "Export",
    icon: "pi pi-fw pi-eject",
  },
  {
    label: "Export Settings",
    icon: "pi pi-fw pi-cog",
    command: () => {
      console.log("Export settings.")
    }
  }
])

const props = defineProps<{
  dialogueName: string,
}>();

const emit = defineEmits<{
  (e: "saveFile"): void,
  (e: "openFile"): void,
}>()
</script>

<template>
  <nav>
    <Toolbar class="editor-navbar">
      <template #start>
        <span class="p-buttonset">
          <Button label="New" icon="pi pi-fw pi-plus" class="p-button-raised p-button-text" />
          <Button label="Open" icon="pi pi-fw pi-file" class="p-button-raised p-button-text" @click="emit('openFile')" />
          <Button label="Save" icon="pi pi-fw pi-save" class="p-button-raised p-button-text" @click="emit('saveFile')" />
          <SplitButton :model="exportItems" label="Export" icon="pi pi-fw pi-eject" class="p-button-raised p-button-text" />
        </span>
      </template>
      <template #end>
        <Button label="Settings" icon="pi pi-fw pi-cog" class="p-button-raised p-button-text" />
      </template>
    </Toolbar>
  </nav>
</template>

<style scoped>
.editor-navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 1;
}
</style>