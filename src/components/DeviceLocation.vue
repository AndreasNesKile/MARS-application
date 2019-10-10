<template>
  <v-flex xs12 v-show="isActive === true">
    <v-expansion-panels>
      <v-expansion-panel>
        <template v-slot:header>
          <div id=headerDeviceLocation> Location </div>
        </template>
          <v-container fluid grid-list-xl>
            <iframe :src="mapLocation" style="height:600px; width:100%"></iframe>
          </v-container>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-flex>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import toastr from 'toastr';

@Component
export default class DeviceLocation extends Vue {
  @Prop() deviceName!: string;
  private isActive: boolean = false;
  private HOST: string = 'http://localhost:8080/api';
  private mapLocation!: string;

  get isDeviceFound() {
    return this.$store.state.device.currentDeviceName.deviceFound;
  }

  get currentDeviceName() {
    return (this.$route.params.deviceName).toUpperCase();
  }

  private fetchData(deviceName: string) {
    return axios
      .get(`${this.HOST}/map/location?code=${this.deviceName}`)
      .then((response) => {
        this.mapLocation = response.data.mapLocation;
        // this.isActive = true;
        this.isActive = false;
        return response;
      })
      .catch((error) => {
        toastr.error(error, 'Fetching device location failed');
        return Promise.reject(new Error(error));
      });
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
    if(this.$store.state.device.currentDevice.deviceFound === true) {
      this.fetchData(this.currentDeviceName);
    } else {
      return;
    }
  }
}
</script>