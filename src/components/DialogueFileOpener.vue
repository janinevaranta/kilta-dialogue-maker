<script setup lang="ts">
import { inject } from "vue";

// Reference to the dialog element is provided by PrimeVue 
// DynamicDialog component.
const dialogRef = inject<any>("dialogRef");

function onUploadFile(event: Event) {
  /**
   * Open a file browser window.
   * The user can browser for a json file,
   * and once uploaded, close the dialogue window
   * and pass the loaded json into it.
   */
  const reader = new FileReader();
  // Define onload function preemptively.
  reader.onload = () => {
    // Close the dialogue and pass the reader result to the
    // parent component.
    dialogRef?.value.close(reader.result);
  }
  // Make a reference to the DOM element that invoked this function.
  const target = event.target as HTMLInputElement;

  // If the uploaded file is not null, 
  // read it and invoke onload function.
  if (target?.files != null) {
    reader.readAsText(target?.files[0]);
  } 
}
</script>

<template>
  <div>
    <input type="file" id="file" accept=".json" @change="onUploadFile">
  </div>
</template>

<style scoped>

</style>