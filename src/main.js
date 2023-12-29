import Vue from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import ToastService from 'primevue/toastservice';
import store from '@/store/store.js';

Vue.config.productionTip = false;

Vue.use(PrimeVue);
Vue.use(ToastService);

new Vue({
  store,
  render: h => h(App),

}).$mount('#app');
