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
  <div class="dialogue-message" :class="props.position" ref="messageElement">
    <Avatar class="dialogue-avatar" :class="props.position" size="large" shape="circle" />
    <Panel :header="props.author" class="dialogue-panel">
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
  max-width: 630px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
.dialogue-pos-left.dialogue-message{
  margin-left: 50px;
}
.dialogue-pos-right.dialogue-message {
  margin-right: 50px;
}
.dialogue-avatar {
  position: absolute;
  top: 0;
}
.dialogue-panel {
  position: relative;
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
.dialogue-pos-left.dialogue-avatar {
  left: -50px;
}
.dialogue-pos-right.dialogue-avatar {
  right: -50px;
}
</style>