import Vue from 'vue';
import Router from 'vue-router';

// View components
import Search from './views/Search.vue';
import Device from './views/Device.vue';

Vue.use(Router);

export default new Router ({
  routes: [
    {
      path: '/',
      name: '/',
      alias: '/search',
      component: Search,
    },
    {
      path: '/device/:deviceName?',
      name: 'device',
      props: true,
      component: Device,
    },
  ],
});
