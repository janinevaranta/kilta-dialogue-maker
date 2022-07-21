<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits, onMounted, Ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { MessageStates, dialogueCharacters, dialoguePositions, dialogueTransitionEffects } from "../data";

const props = defineProps<{
  index: number,
  position: string,
  content: string,
  author: string,
  effect?: string,
  state: number,
}>();

const emit = defineEmits<{
  (e: "deleteMessage", opts: {index: number}): void,
  (e: "swapStarted", opts: {index: number}): void,
  (e: "swapEnded", opts: {index: number}): void,
  (e: "startEdit"): void,
  (e: "stopEdit", index: number, newAuthor: string, newContent: string, newPosition: string, newEffect?: string): void,
}>()

const confirm = useConfirm();

const messageIndex = ref(props.index);
const messageAuthor = ref(props.author);
const messageContent = ref(props.content);
const messagePosition = ref(props.position);
const messageEffect = ref(props.effect);

const messageOptionsElement = ref<null | Ref>(null);
const messageOptions = ref([
  {
    label: "Options",
    items: [
      {
        label: "Edit",
        icon: "pi pi-pencil",
        command: () => {
          emit("startEdit");
        },
      },
      {
        label: "Change Order",
        icon: "pi pi-sort-alt",
        command: () => {
          startSwap();
        }
      },
      {
        label: "Delete",
        icon: "pi pi-times",
        acceptClass: 'p-button-danger',
        command: () => {
          confirmDelete();
        },
      }
    ]
  }
])

// Make a reference to the DOM, so that we can scroll into the new element once its
// been mounted.
const messageElement = ref<null | HTMLDivElement>(null);

onMounted(() => {
  if (messageElement.value != null) {
    messageElement.value.scrollIntoView({behavior: "smooth"});
  }
});

function toggleOptions(event: Event) {
  messageOptionsElement.value?.toggle(event);
}

const confirmDelete = () => {
  confirm.require({
    message: "Are you sure you want to delete the entry?",
    header: "Delete Confirmation",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: () => {
      emit("deleteMessage", { index: props.index });
    },
    reject: () => {
      console.log("Rejected");
    }
  });
};

const startSwap = () => {
  emit("swapStarted", { index: props.index });
}
const endSwap = () => {
  emit("swapEnded", { index: props.index })
}
const stopEditing = () => {
  console.log(messageIndex.value)
  emit("stopEdit", messageIndex.value, messageAuthor.value, messageContent.value, messagePosition.value, messageEffect.value);
}

</script>

<template>
  <Transition name="popup" appear>
    <div v-if="props.state == MessageStates.Normal" class="dialogue-message" :class="props.position" ref="messageElement">
      <Avatar class="dialogue-message-avatar" :class="props.position" size="large" shape="circle" />
      <Panel class="dialogue-message-panel">
        <template #header>
          <span>
            <p class="dialogue-message-panel-header-content">{{ props.author }}</p>
            <i v-show="props.effect != 'nothing'" class="dialogue-message-panel-header-content dialogue-message-effect">{{ props.effect }}</i>
          </span>
        </template>
        <template #icons>
          <button v-if="props.state == MessageStates.Normal" class="p-panel-header-icon p-link mr-2" @click="toggleOptions">
            <span class="pi pi-cog"></span>
          </button>
          <Button v-else-if="props.state == MessageStates.IsSwapTarget" label="Swap" @click="endSwap" />
          <Menu id="config_menu" class="dialogue-message-options" ref="messageOptionsElement" :model="messageOptions" :popup="true"  />
        </template>
        <p>
          {{ props.content }}
        </p>
      </Panel>
    </div>
    <div v-else-if="props.state == MessageStates.IsEditing" class="dialogue-message" :class="props.position">
      <Panel>
        <Avatar class="dialogue-message-avatar" :class="props.position" size="large" shape="circle" />
        <template #header>
          <Dropdown v-model="messageAuthor" :options="dialogueCharacters" :placeholder="messageAuthor"></Dropdown>
          <Dropdown v-model="messagePosition" :options="dialoguePositions" :placeholder="messagePosition.split('-')[2]"></Dropdown>
          <Dropdown v-model="messageEffect" :options="dialogueTransitionEffects" :placeholder="messageEffect"></Dropdown>
          <Button label="Done" @click="stopEditing" />
        </template>
        <Textarea v-model="messageContent" :autoResize="true" rows="4" cols="40">
        </Textarea>
      </Panel>
    </div>
  </Transition>
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
.dialogue-message-avatar {
  position: absolute;
  top: 0;
}
.dialogue-message-panel {
  position: relative;
  width: 100%;
  max-width: 630px;
  margin: 20px auto 20px auto;
}
.dialogue-message-panel-header-content {
  display: inline-block;
  margin-left: 10px;
}
.dialogue-message-effect {
  font-size: 0.8em;
}
.p-panel p {
  line-height: 1.5;
  margin: 0;
  text-align: left;
  overflow-wrap: break-word;
}
.dialogue-pos-left.dialogue-message-avatar {
  left: -50px;
}
.dialogue-pos-right.dialogue-message-avatar {
  right: -50px;
}
.dialogue-message-options {

}

/* ANIMATIONS */
.popup-enter-active {
  transition: all 0.3s ease-out;
}
.popup-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

</style>