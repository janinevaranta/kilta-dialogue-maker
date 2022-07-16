<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps<{
  position: string,
  content: string,
  author: string,
}>();

</script>

<template>
  <div class="dialogue-message">
    <Panel :header="props.author" class="dialogue-panel" :class="props.position">
      <Avatar class="dialogue-avatar" size="large" :class="props.position"  shape="circle" />
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
  position: relative;
}
.p-panel p {
  line-height: 1.5;
  margin: 0;
  text-align: left;
}
.dialogue-pos-left.dialogue-panel {
  left: 5%;
}
.dialogue-pos-right.dialogue-panel {
  right: 5%;
}
.dialogue-pos-left.dialogue-avatar {
  right: -60px;
}
.dialogue-pos-right.dialogue-avatar {
  left: -60px;
}
</style>