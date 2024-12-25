import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate';

import App from './App.vue'
import router from './router'
import './index.css'; // index.cssをインポート

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPersist); // persist プラグインを追加

app.use(pinia);
app.use(router)

app.mount('#app')
