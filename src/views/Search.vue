<template>
  <v-app id="searchPage">
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
        no-gutters
      >
        <v-col
          xs="12"
          sm="10"
          md="10"
          :lg="advancedSearch !== true ? 3 : 8"
        >
          <v-card
            class="elevation-12"
          >
            <v-card-title primary-title>
              <h3 class="headline mb-0">Search for device</h3>
            </v-card-title>
            <v-card-text>
              <v-form @keyup.enter.native="searchDevice()">
                <v-container v-if="advancedSearch !== true">
                  <v-row>
                    <v-col
                      cols="12"
                      xs="12"
                    >
                      <v-text-field
                          v-model="deviceName"
                          label="Device code"
                          hint=" Ex. CFP-US25-QURCACC"
                          clearable
                          clear-icon
                        ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container v-else>
                  <v-row>
                    <v-col
                      cols="12"
                      xs="12"
                      lg="4"
                    >
                      <v-col>
                        <v-text-field
                          v-model="deviceName"
                          label="Device code"
                          hint=" Ex. CFP-US25-QURCACC"
                          clearable
                          clear-icon
                        > 
                        </v-text-field>
                      </v-col>
                    </v-col>
                    <v-col
                      cols="12"
                      xs="12"
                      lg="4"
                    >
                      <v-col>
                        <v-text-field
                          label="Description"
                          hint="PLC QURCACC P2"
                          clearable
                          clear-icon
                        >
                        </v-text-field>
                      </v-col>
                    </v-col>
                    <v-col
                      cols="12"
                      xs="12"
                      lg="4"
                    >
                      <v-col>
                        <v-text-field
                          label="MRC/Tag"
                          hint="EN/ICE/PLC"
                          clearable
                          clear-icon
                        >
                        </v-text-field>
                      </v-col>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      xs="12"
                      lg="4"
                    >
                      <v-col>
                        <v-text-field
                          label="Class/Type"
                          hint="PLC QURCACC P2"
                          clearable
                          clear-icon
                        >
                        </v-text-field>
                      </v-col>
                    </v-col>
                    <v-col
                      cols="12"
                      xs="12"
                      lg="4"
                    >
                      <v-col>
                        <v-text-field
                          label="Category/Zone"
                          hint="QURCA-EM02=US25"
                          clearable
                          clear-icon
                        >
                        </v-text-field>
                      </v-col>
                    </v-col>
                    <v-col
                      cols="12"
                      xs="12"
                      lg="4"
                    >
                      <v-col>
                        <v-text-field
                          label="Serial number"
                          hint="PLC QURCACC P2"
                          clearable
                          clear-icon
                        >
                        </v-text-field>
                      </v-col>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      xs="12"
                      lg="4"
                    >
                      <v-col>
                        <v-text-field
                          label="Status"
                          hint="ACTIVE"
                          clearable
                          clear-icon
                        >
                        </v-text-field>
                      </v-col>
                    </v-col>
                    <v-col
                      cols="12"
                      xs="12"
                      lg="4"
                    >
                      <v-col>
                        <v-text-field
                          label="Location"
                          hint="2227/2-0000"
                          clearable
                          clear-icon
                        >
                        </v-text-field>
                      </v-col>
                    </v-col>
                    <v-col
                      cols="12"
                      xs="12"
                      lg="4"
                    >
                        <v-col>
                          <v-text-field
                            label="Model/Hardware"
                            hint="PREMIUM"
                            clearable
                            clear-icon
                          >
                          </v-text-field>
                        </v-col>
                      </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      xs="12"
                      lg="4"
                    >
                      <v-col>
                        <v-text-field
                          label="Manufacturer"
                          hint="SCHNEIDER"
                          clearable
                          clear-icon
                        >
                        </v-text-field>
                      </v-col>
                    </v-col>
                    <v-col
                      cols="12"
                      xs="12"
                      lg="4"
                    >
                      <v-col>
                        <v-text-field
                          label="Responsible"
                          hint="E-GROUP EN-ICE-INTERNAL-LIST-PLC-SUPPORT (BE/ICS)"
                          clearable
                          clear-icon
                        >
                        </v-text-field>
                      </v-col>
                    </v-col>
                    <v-col
                      cols="12"
                      xs="12"
                      lg="4"
                    >
                      <v-col>
                        <v-text-field
                          label="User"
                          hint="E-GROUP EN-ICE-INTERNAL-LIST-PLC-SUPPORT (BE/ICS)"
                          clearable
                          clear-icon
                        >
                        </v-text-field>
                      </v-col>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      xs="1"
                      lg="2"
                    >
                      <v-col>
                        <v-switch v-model="landb" label="LANDB"></v-switch>
                      </v-col>
                    </v-col>
                    <v-col
                      cols="12"
                      xs="1"
                      lg="2"
                    >
                      <v-col>
                        <v-switch v-model="eamobj" label="EAMOBJ"></v-switch>
                      </v-col>
                    </v-col>
                    <v-col
                      cols="5"
                      xs="1"
                      lg="2"
                    >
                      <v-col>
                        <v-switch v-model="eampart" label="EAMPART"></v-switch>
                      </v-col>
                    </v-col>
                    <v-col
                      cols="12"
                      xs="1"
                      md="1"
                      lg="2"
                    >
                      <v-col>
                        <v-switch v-model="layout" label="LAYOUT"></v-switch>
                      </v-col>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-expand-transition></v-expand-transition>
              <v-btn 
                  small
                  tile
                  color="primary"
                  @click="searchDevice()"
                > Search
                <v-icon>search</v-icon>
                </v-btn>                  
                <v-btn 
                  small
                  tile
                  color="info"
                  @click="advancedSearch = !advancedSearch"
                > Advanced search
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import axios from 'axios';
import toastr from 'toastr';

@Component
export default class Search extends Vue {
  private deviceName: string = '';
  private description: string = '';
  private mrcTag: string = '';
  private classType: string ='';
  private categoryZone: string = '';
  private serialNumber: string = '';
  private status: string = '';
  private location: string = '';
  private modelHardware: string = '';
  private manufacturer: string = '';
  private responsible: string = '';
  private user: string = '';
  private advancedSearch: boolean = false;
  private landb: boolean = false;
  private eamobj: boolean = false;
  private eampart: boolean = false;
  private layout: boolean = false;
  private HOST = 'http://localhost:8080/api'

  private setAdvancedSearch() {
    return this.advancedSearch = true;
  }
  private searchDevice() {
    if (this.deviceName) {
      this.$store.dispatch('device/setDeviceName', this.deviceName)
      .then(() => {
        this.$router.push({name: 'device', params: {deviceName: this.deviceName}});
      });
    }
  }

}
</script>