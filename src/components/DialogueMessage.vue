<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, Ref } from "vue";
import { useConfirm } from "primevue/useconfirm";

const props = defineProps<{
  index: number,
  position: string,
  content: string,
  author: string,
  effect?: string,
}>();

const emit = defineEmits<{
  (e: "deleteMessage", opts: {index: number}): void
}>()

const confirm = useConfirm();

const messageOptionsElement = ref<null | Ref>(null);
const messageOptions = ref([
  {
    label: "Options",
    items: [
      {
        label: "Edit",
        icon: "pi pi-pencil",
        command: () => {
          console.log("Testi")
        },
      },
      {
        label: "Delete",
        icon: "pi pi-times",
        command: () => {
          confirmDelete()
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

</script>

<template>
  <Transition name="popup" appear>
    <div class="dialogue-message" :class="props.position" ref="messageElement">
      <Avatar class="dialogue-message-avatar" :class="props.position" size="large" shape="circle" />
      <Panel class="dialogue-message-panel">
        <template #header>
          <span >
            <p class="dialogue-message-panel-header-content">{{ props.author }}</p>
            <i v-show="props.effect != 'nothing'" class="dialogue-message-panel-header-content dialogue-message-effect">{{ props.effect }}</i>
          </span>
        </template>
        <template #icons>
          <button class="p-panel-header-icon p-link mr-2" @click="toggleOptions">
            <span class="pi pi-cog"></span>
          </button>
          <Menu id="config_menu" class="dialogue-message-options" ref="messageOptionsElement" :model="messageOptions" :popup="true"  />
        </template>
        <p>
          {{ props.content }}
        </p>
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