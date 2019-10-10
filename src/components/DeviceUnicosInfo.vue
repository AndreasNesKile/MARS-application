<template>
  <v-flex xs12 md3 lg4 v-show="isActive === true">
    <v-expansion-panels>
      <v-expansion-panel>
        <template v-slot:header>
          <div id="headerDeviceUNICOSInfoTable">UNICOS Info</div>
        </template>
        <template>
          <table id="deviceUnicosInfoTable">
            <tr>
              <td id="deviceUnicosInfoAttributes">Host </td>
              <td>{{ unicosInfo.hostName }}</td>
            </tr>
            <tr>
              <td id="deviceUnicosInfoAttributes">WinCC OA project </td>
              <td>{{ unicosInfo.projectName }}</td>
            </tr>
            <tr>
              <td id="deviceUnicosInfoAttributes">Redundant host </td>
              <td>{{ unicosInfo.redundantHost }}</td>
            </tr>
          </table>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-flex>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';
import toastr from 'toastr';

import IDeviceInfo from '../interfaces/IDeviceInfo';

@Component
export default class DeviceUnicosInfo extends Vue {
  @Prop() deviceName!: string;
  private isActive: boolean = true;
  private HOST = 'http://localhost:8080/api';
  private unicosInfo = {};

  get currentDeviceName() {
    return (this.$route.params.deviceName).toUpperCase();
  }

  private fetchData(currentDeviceName: string) {
    if(this.$store.state.device.currentDevice.deviceFound === true) {
      return axios
        .get(`${this.HOST}/icesas/general?code=${this.deviceName}`)
        .then((response) => {
          this.unicosInfo = response.data;
          return response;
        })
        .catch((error) => {
          toastr.error(error, 'Fetching device UNICOS info failed');
          return Promise.reject(new Error(error));
        });
    }
  }

  @Watch('deviceName')
  onDeviceNameChange(newDeviceName: string, oldDeviceName: string) {
    if(newDeviceName === oldDeviceName) {
      return;
    } else {
      this.fetchData(this.currentDeviceName)
    }
  }

  private mounted() {
    if(this.deviceName) {
      this.fetchData(this.currentDeviceName);
    } else {
      return;
    }
  }
}
</script>

<style>
#deviceUnicosInfoTable {
  border-collapse: collapse;
  width: 100%
}

#deviceUnicosInfoTable td, #deviceUnicosInfoTable th {
  border-bottom: 1px solid #ddd;
  padding: 8px;
}

#deviceUnicosInfoTable tr:hover {background-color: #ddd;}

#deviceUnicosInfoAttributes {
  font-weight: bold;
}


</style>