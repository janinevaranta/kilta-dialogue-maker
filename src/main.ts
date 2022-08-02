import { createApp } from 'vue'
import router from "./router";
import App from './App.vue'
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import ToastService from "primevue/toastservice";

import PrimeVue from "primevue/config";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Panel from "primevue/panel";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatar";
import Menu from "primevue/menu";
import ConfirmDialog from "primevue/confirmdialog";
import SplitButton from "primevue/SplitButton";
import FileUpload from "primevue/fileupload";
import Chips from "primevue/chips";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(DialogService);
app.use(ToastService);

app.component("Toolbar", Toolbar);
app.component("Button", Button);
app.component("Panel", Panel);
app.component("Textarea", Textarea);
app.component("InputText", InputText);
app.component("Dropdown", Dropdown);
app.component("Avatar", Avatar);
app.component("AvatarGroup", AvatarGroup);
app.component("Menu", Menu);
app.component("ConfirmDialog", ConfirmDialog);
app.component("SplitButton", SplitButton);
app.component("FileUpload", FileUpload);
app.component("Chips", Chips);

app.mount('#app');
