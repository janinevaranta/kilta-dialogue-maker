<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";

const props = defineProps<{
  position: string,
  content: string,
  author: string,
}>();

// Make a reference to the DOM, so that we can scroll into the new element once its
// been mounted.
const messageElement = ref<null | HTMLDivElement>(null);

onMounted(() => {
  if (messageElement.value != null) {
    messageElement.value.scrollIntoView({behavior: "smooth"});
  }
});
</script>

<template>
  <div class="dialogue-message" ref="messageElement">
    <Avatar class="dialogue-avatar" size="large" :class="props.position"  shape="circle" />
    <Panel :header="props.author" class="dialogue-panel" :class="props.position">
      <p>
        {{ props.content }}
      </p>
    </Panel>
  </div>
</template>

<style scoped>
.dialogue-message {
  display: block;
  position: relative;
  justify-content: center;
}
.dialogue-avatar {
  position: absolute;
  top: 0;
}
.dialogue-panel {
  width: 100%;
  max-width: 630px;
  margin: 20px auto 20px auto;
}
.p-panel p {
  line-height: 1.5;
  margin: 0;
  text-align: left;
  overflow-wrap: break-word;
}
.dialogue-pos-left.dialogue-panel {
  left: 5%;
}
.dialogue-pos-right.dialogue-panel {
  right: 5%;
}
.dialogue-pos-left.dialogue-avatar {
  left: 0px;
}
.dialogue-pos-right.dialogue-avatar {
  right: 0px;
}
</style>