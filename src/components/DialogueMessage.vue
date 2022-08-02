<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, Ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
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

// PrimeVue functions that we can later use to 
// display confirm window or a toast message.
const confirm = useConfirm();
const toast = useToast();

// Different options the message can have. 
// They are references of the props as that makes them mutatable.
const messageIndex = ref(props.index);
const messageAuthor = ref(props.author);
const messageContent = ref(props.content);
const messagePosition = ref(props.position);
const messageEffect = ref(props.effect);

// Initialize the DOM element reference. This will later be assigned as the corresponding DOM
// element once the component has mounted.
const messageOptionsElement = ref<null | Ref>(null);

// Options that the message can have.
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

// Once the DOM has been loaded, we can scroll the created message into the
// view.
onMounted(() => {
  if (messageElement.value != null) {
    messageElement.value.scrollIntoView({behavior: "smooth"});
  }
});

function toggleOptions(event: Event) {
  /**
   * Toggles the options list on and off.
   */
  messageOptionsElement.value?.toggle(event);
}

// Confirmation window options.
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
  /**
   * DEPRECATED
   * TODO: Make something of use out of this.
   */
  emit("swapStarted", { index: props.index });
}
const endSwap = () => {
  /**
   * DEPRECATED
   * TODO: Make something of use out of this.
   */
  emit("swapEnded", { index: props.index })
}
const stopEditing = () => {
  /**
   * Emit the contents of the editted message to the main component.
   * These will replace the messages previous content in the <MessageOptions> array.
   */
  if (messageAuthor.value == "") {
    toast.add({severity: "warn", summary: "Empty Author", detail: "Please select an author for the message.", life: 5000});
    return;
  } else if (messageContent.value.trim() == "") {
    toast.add({severity: "warn", summary: "Empty Input", detail: "Message input cannot be empty.", life: 5000});
    return;
  }
  emit("stopEdit", messageIndex.value, messageAuthor.value, messageContent.value.trim(), messagePosition.value, messageEffect.value);
}

</script>

<template>
  <Transition name="popup" appear>
    <div v-if="props.state == MessageStates.Normal" class="dialogue-message" :class="props.position" ref="messageElement">
      <Panel class="dialogue-message-panel">
        <template #header>
          <span class="dialogue-message-header">
            <Avatar class="dialogue-message-avatar" :class="`position-${props.position}`" shape="circle" />
            <p tabindex="0" class="dialogue-message-panel-header-content">{{ props.author }}</p>
            <i tabindex="0" v-show="props.effect != 'nothing'" class="dialogue-message-panel-header-content dialogue-message-effect">{{ props.effect }}</i>
          </span>
        </template>
        <template #icons>
          <button v-if="props.state == MessageStates.Normal" class="p-panel-header-icon p-link mr-2" @click="toggleOptions">
            <span class="pi pi-cog"></span>
          </button>
          <Button v-else-if="props.state == MessageStates.IsSwapTarget" label="Swap" @click="endSwap" />
          <Menu id="config_menu" class="dialogue-message-options" ref="messageOptionsElement" :model="messageOptions" :popup="true"  />
        </template>
        <p tabindex="0">
          {{ props.content }}
        </p>
      </Panel>
    </div>
    <div v-else-if="props.state == MessageStates.IsEditing" class="dialogue-message" :class="props.position">
      <Panel>
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
.dialogue-pos-1.dialogue-message{
  margin-left: 30px;
}
.dialogue-pos-2.dialogue-message {
  margin-right: 30px;
}
.dialogue-message-avatar {
  top: 0;
}
.dialogue-message-panel {
  position: relative;
  width: 100%;
  max-width: 630px;
  margin: 20px auto 20px auto;
}
.dialogue-message-header {

}
.dialogue-message-panel-header-content {
  display: inline-block;
  position: relative;
  left: 10px;
  top: -8px;
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
.dialogue-pos-1.dialogue-message-avatar {
  left: -50px;
}
.dialogue-pos-2.dialogue-message-avatar {
  right: -50px;
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