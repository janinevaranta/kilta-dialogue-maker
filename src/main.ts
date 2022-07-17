import { createApp } from 'vue'
import App from './App.vue'
import ConfirmationService from "primevue/confirmationservice";
import PrimeVue from "primevue/config";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Panel from "primevue/panel";
import Textarea from "primevue/textarea";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatar";
import Menu from "primevue/menu";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(PrimeVue);
app.use(ConfirmationService);

app.component("Toolbar", Toolbar);
app.component("Button", Button);
app.component("Panel", Panel);
app.component("Textarea", Textarea);
app.component("Dropdown", Dropdown);
app.component("Avatar", Avatar);
app.component("AvatarGroup", AvatarGroup);
app.component("Menu", Menu);

app.mount('#app');
