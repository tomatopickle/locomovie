import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/lara-dark-purple/theme.css';
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Timeline from 'primevue/timeline';
import DataView from 'primevue/dataview';
import Ripple from 'primevue/ripple';

const app = createApp(App);
app.use(PrimeVue, { ripple: true, inputStyle: 'filled' });
app.use(router);
app.directive('ripple', Ripple);
app.component("InputText", InputText);
app.component("Button", Button);
app.component("Timeline", Timeline);
app.component("DataView", DataView);


app.mount('#app');
