import { createApp } from 'vue';
import App from '@/App.vue';
import { initializeI18next } from '@/i18n';

const app = createApp(App);

await initializeI18next();

app.mount('#app');
