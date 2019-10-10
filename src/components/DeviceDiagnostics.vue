<template>
  <v-flex xs12 md3 lg4 mb-3 v-show="isActive === true">
    <v-expansion-panels>
      <v-expansion-panel>
        <template v-slot:header>
          <div id="headerDeviceDiagnosticsTable"> Diagnostics </div>
        </template>
        <v-expansion-panel-content>
          <v-card>
            <v-container fluid grid-list-lg>
              <v-layout wrap>
                <v-flex xs12>
                  <v-card>
                    <v-card-text>
                      <i v-for="(state, index) in memoryCardBatteryMetricValues"
                        :key="index"
                      >
                        <div>
                          <i class="fas fa-square fa-lg" v-show="colourStateFound === true" v-bind:style="{color: state.colour }"></i> 
                          {{ state.moonDpConfig.description }}
                        </div>
                      </i>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12>
                  <v-card>
                    <v-card-title primary-title>
                      <div class="headline"> {{this.diagnostics.moonDeviceInformation.info.data['0'].moonDpConfig.description}} </div>
                    </v-card-title>
                    <v-card-text>
                      <table>
                        <tr>
                          <td> {{ this.diagnostics.moonDeviceInformation.info.data['0'].moonDpConfig.description }} </td>
                          <td> {{ this.diagnostics.moonDeviceInformation.info.data['0'].value }} </td>
                        </tr>
                      </table>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12>
                  <v-card>
                    <v-card-title>
                      <div class="headline"> {{ this.diagnostics.moonDeviceInformation.info.data['1'].moonDpConfig.description }} </div>
                    </v-card-title> 
                    <v-card-text>
                      <i v-html="this.diagnostics.moonDeviceInformation.info.data['1'].value"></i>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import toastr from 'toastr';
import axios from 'axios';

@Component
export default class DeviceDiagnostics extends Vue {
  @Prop() deviceName !: string;
  private isActive: boolean = false;
  private colourStateFound: boolean = false;
  private HOST: string = 'http://localhost:8080/api';
  private diagnostics: any = {};
  private memoryCardBatteryMetricValues!: [];
  private memoryCardBatteryState: string ='';

  get currentDeviceName() {
    return (this.$route.params.deviceName).toUpperCase();
  }

  get currentStatusOnDevice() {
    return this.memoryCardBatteryMetricValues;
  }

  private fetchData(deviceName: string) {
    if(this.$store.state.device.currentDevice.deviceFound === true) {
      return axios
        .get(`${this.HOST}/moon/deviceInfo?code=${this.deviceName}`)
        .then((response) => {
          this.diagnostics = response.data;
          this.$store.dispatch('device/setDeviceStatus', response.data.moonDeviceInformation.state);
          this.memoryCardBatteryMetricValues = this.diagnostics.moonDeviceInformation.metrics.values;
          this.isActive = true;
          this.colourStateFound = true;
          return response;
        })
        .catch((error) => {
          toastr.error(error, 'Fetching device diagnostics failed');
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
    if(this.$store.state.device.currentDevice.deviceFound === true) {
      this.fetchData(this.currentDeviceName);
    } else {
      return;
    }
  }
}


</script>

<style scoped>

#deviceDiagnosticsAttributes {
  font-size: 12pt;
}


</style>