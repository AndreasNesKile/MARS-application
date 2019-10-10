import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import store from './store/store';
import router from './router';
import './registerServiceWorker';
import 'toastr/build/toastr.min.css';
import vuetify from './plugins/vuetify';
// import { tree } from 'vued3tree';

Vue.config.productionTip = false;
// Vue.use(tree);


new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
