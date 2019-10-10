import Vue from 'vue';
import Vuex from 'vuex';

import device from '@/store/modules/device';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules : {
    device,
  },
});

export default store;
