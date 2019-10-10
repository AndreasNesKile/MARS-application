<template>
  <v-flex xs12 md6 lg4 xl4 v-show="isActive === true">
    <v-expansion-panels>
      <v-expansion-panel>
        <template v-slot:header>
          <div id="headerDeviceEquipmentStructureTable"> Equipment Structure </div>
        </template>
        <template>
          <v-flex xs12 md4 xl3>
            <!-- <tree
              :data="dataExample"
              node-text="name"
              layoutType="circular"
            >
            </tree> -->
            <v-treeview 
              :items="setTreeNodes"
              open-on-click
              loading-icon
              transition
              activatable
            ></v-treeview>
          </v-flex>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';
import toastr from 'toastr';
import { isEmpty } from 'lodash';
import { tree } from 'vued3tree';


@Component
export default class DeviceEquipmentStructure extends Vue {
  @Prop() deviceName!: string;
  private isActive: boolean = false;
  private HOST = 'http://localhost:8080/api';

  private parentNode = {
    assetDescription: '',
    children: []
  };

  get dataExample() {
    let test =  [
      { name: 'Item 1', state: { visible: false } },
      { name: 'Item 2', data: { customProp: 'AAAAAAAAAAAAAAAAAAAA' } },
      { name: 'Item 3', state: { selected: true } },
      { name: 'Item 4' },
      { name: 'Item 5', children: [
        { name: 'Item 5.1', state: { disabled: true } },
        { name: 'Item 5.2', state: { selectable: false } }
        ]
      }
    ]
    return test;
  }

  private childrenNodes = {
    name: '',
    description: '',
    children: []
  };

  get setTreeNodes() {
    return [
      {
        name: this.parentNode.assetDescription,
        children: [
          {
            name: this.childrenNodes.name,
            children: this.childrenNodes.children,
            description: this.childrenNodes.description,
          }
        ]
      }
    ]
  }

  get currentDeviceName() {
    return (this.$route.params.deviceName).toUpperCase();
  }

  private fetchData(deviceName: string) {
    return axios
      .get(`${this.HOST}/infor/position?code=${this.deviceName}`)
      .then((response) => {
        this.isActive = true;
        this.parentNode = response.data;
        this.childrenNodes = response.data.children.components['0'];
        return response;
      })
      .catch((error) => {
        toastr.error(error, 'Fetching equipment structure failed');
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