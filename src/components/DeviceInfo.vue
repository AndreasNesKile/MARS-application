<template>
  <v-flex xs12 md3 lg4 v-show="isActive === true">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header> Info </v-expansion-panel-header>
        <template>
          <table id="deviceInfoTable">
            <tr>
              <td id="deviceInfoAttributes">Device type:</td>
              <td>{{currentDeviceInfo.genericType}}</td>
            </tr>
            <tr>
              <td id="deviceInfoAttributes">Maker:</td>
              <td>{{currentDeviceInfo.maker}}</td>
            </tr>
            <tr>
              <td id="deviceInfoAttributes">H/W: </td>
              <td>{{currentDeviceInfo.hardwareType}}</td>
            </tr>
            <tr>
              <td id="deviceInfoAttributes">Description: </td>
              <td>{{currentDeviceInfo.description}}</td>
            </tr>
            <tr>
              <td id="deviceInfoAttributes">Location: </td>
              <td>{{currentDeviceInfo.location}}</td>
            </tr>
            <tr>
              <td id="deviceInfoAttributes">Outlet: </td>
              <td>{{currentDeviceInfo.outlet}}</td>
            </tr>
            <tr>
              <td id="deviceInfoAttributes">Responsible person: </td>
              <td>{{currentDeviceInfo.responsiblePerson}}</td>
            </tr>
            <tr>
              <td id="deviceInfoAttributes">Main user: </td>
              <td>{{currentDeviceInfo.mainUser}}</td>
            </tr>
          </table>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import axios from 'axios';
import toastr from 'toastr';

import IDeviceInfo from '../interfaces/IDeviceInfo';

@Component
export default class DeviceInfo extends Vue {
  @Prop() deviceInfo: any;
  private HOST = 'http://localhost:8080/api';
  private currentDeviceInfo = {};
  private isActive: boolean = false;


  get currentDeviceName() {
    return this.$route.params.deviceName;
  }

  get currentInfoAboutDevice() {
    return this.deviceInfo;
  }

  private fetchData(currentDeviceName: string) {
    return axios
      .get(`${this.HOST}/landb/general?code=${this.currentDeviceName}`)
      .then((response) => {
        this.currentDeviceInfo = response.data;
        this.isActive = true;
        return response;
      })
      .catch((error) => {
        toastr.error(error, 'Fetching device info failed');
        return Promise.reject(new Error(error));
      });    
  }

  @Watch('deviceInfo')
  onDeviceNameChange(newDeviceName: string, oldDeviceName: string) {
    if(newDeviceName === oldDeviceName) {
      return;
    } else {
     this.fetchData(this.currentDeviceName);
    }
  }

  private mounted() {
    if(this.currentDeviceName) {
      this.fetchData(this.currentDeviceName);
    } else {
      return;
    }
  }
}
</script>

<style>
#deviceInfoTable {
  border-collapse: collapse;
  width: 100%
}

#deviceInfoTable td, #deviceInfoTable th {
  border-bottom: 1px solid #ddd;
  padding: 8px;
}

/* #deviceInfoTable tr:nth-child(even) {background-color: #f2f2f2;} */

#deviceInfoTable tr:hover {background-color: #ddd;}

#deviceInfoAttributes {
  font-weight: bold;
}

</style>