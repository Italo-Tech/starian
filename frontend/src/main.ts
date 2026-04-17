import { createApp } from 'vue';
import { MotionPlugin } from '@vueuse/motion';
import Toast, { type PluginOptions, POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './styles.css';
import App from './App.vue';

const toastOptions: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 4000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  showCloseButtonOnHover: false,
  closeButton: 'button',
  icon: true,
};

const app = createApp(App);
app.use(MotionPlugin);
app.use(Toast, toastOptions);
app.mount('#app');
