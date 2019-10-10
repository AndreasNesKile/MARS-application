// Mutation constants
const SET_DEVICE_STATUS         = 'SET_DEVICE_STATUS';
const SET_DEVICE_NAME           = 'SET_DEVICE_NAME';
const SET_DEVICE_FOUND          = 'SET_DEVICE_FOUND';

interface IDeviceState {
  state: string;
  colour: string;
}


const HOST = 'http://localhost:8080/api';

const state = {
  currentDevice: {
    deviceFound: false,
    name: '',
    status: {
      state: '',
      colour: '',
    },
  },
};

  // Mutations
const mutations = {
  [SET_DEVICE_NAME](state, deviceName: string) {
    state.currentDevice.name = deviceName;
  },

  [SET_DEVICE_FOUND](state) {
    state.currentDevice.deviceFound = true;
  },

  [SET_DEVICE_STATUS](state, currentDeviceState: IDeviceState) {
    state.currentDevice.status.state = currentDeviceState.state;
    state.currentDevice.status.colour = currentDeviceState.colour.toLowerCase();
  },
};
  // Actions
const actions = {
  setDeviceName({ commit }, deviceName: string) {
    commit(SET_DEVICE_NAME, deviceName);
  },

  setDeviceFound({ commit }) {
    commit(SET_DEVICE_FOUND);
  },

  setDeviceStatus({ commit }, currentDevice: object) {
    commit(SET_DEVICE_STATUS, currentDevice);
  },
};

  // Getters
const getters = {};

const device = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default device;
