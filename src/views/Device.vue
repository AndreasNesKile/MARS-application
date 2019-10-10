<template>
  <div id="app">
    <v-container fluid grid-list-xl>
      <v-layout wrap>
        <v-flex xs12 md3 lg6>
          <div class="searchDeviceName" >
            <div class="deviceTitle">
              <div style="font-weight: bold; font-size: 24px;">Device: </div><span class="deviceName" style="font-weight: bold;">{{ currentDeviceName }}</span>
              </div>
            <div class="deviceStatus" >
              <h2>State: 
                <v-chip v-if="currentDeviceStatus" :color="currentDeviceStatusColour" disabled text-color="white">
                  {{ currentDeviceStatus.state }}
                  
                </v-chip>
              </h2> 
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout wrap v-show="deviceFound === true">
          <device-info :deviceInfo="currentDevice"/>
          <device-diagnostics :deviceName="deviceName"/>
          <device-unicos-info :deviceName="deviceName"/>
          <device-equipment-structure :deviceName="deviceName"/>
          <device-location :deviceName="deviceName"/>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import toastr from 'toastr';

// Components
import DeviceDiagnostics from '../components/DeviceDiagnostics.vue';
import DeviceEquipmentStructure from '../components/DeviceEquipmentStructure.vue';
import DeviceInfo from '../components/DeviceInfo.vue';
import DeviceLocation from '../components/DeviceLocation.vue';
import DeviceUnicosInfo from '../components/DeviceUnicosInfo.vue';

// Interface
import IDeviceInfo from '../interfaces/IDeviceInfo';

@Component({
  components: {
    DeviceDiagnostics,
    DeviceEquipmentStructure,
    DeviceInfo,
    DeviceLocation,
    DeviceUnicosInfo,
  },
})
export default class Device extends Vue {
  private HOST = 'http://localhost:8080/api';
  private deviceName: string = '';
  private currentDevice: IDeviceInfo = {
    maker: '',
    hardwareType: '',
    genericType: '',
    responsiblePerson: '',
    mainUser: '',
    location: '',
    group: '',
    description: '',
    outlet: '',
    outletId: '',
    hostName: '',
  };
  
  get currentDeviceStatus() {
    return this.$store.state.device.currentDevice.status;
  }

  get currentDeviceStatusColour() {
    return (this.$store.state.device.currentDevice.status.colour)
  }

  get currentDeviceName() {
    return (this.$route.params.deviceName).toUpperCase();
  }

  get deviceFound() {
    return this.$store.state.device.currentDevice.deviceFound; 
  }

  private fetchData() {
    return axios
      .get(`${this.HOST}/landb/general?code=${this.currentDeviceName}`)
      .then((response) => {
        this.currentDevice = response.data;
        this.$store.dispatch('device/setDeviceFound');
        return response;
      })
      .catch((error) => {
        toastr.error(error, 'Fetching device info failed');
        return Promise.reject(new Error(error));
      });
  }

  private mounted() {
    this.fetchData()
    .then((response) => {
      if(response) {
        this.deviceName = this.currentDeviceName;
      } else {
        toastr.error('Device not found', 'ERROR');
        return;
      }
    })
    .catch((error) => {
      toastr.error(error, 'ERROR');
      Promise.reject(new Error(error));
    })
  }
}

</script>

<style>

</style>
