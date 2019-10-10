<template>
  <v-app>
    <AppNavBar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';


import AppNavBar from './components/AppNavBar.vue';

@Component({
  components: {
    AppNavBar,
  }
})
export default class App extends Vue {
  constructor() {
    super();
    fontawesome.library.add(solid);
  }
}
</script>

<style>

.mars-navbar {
  border-bottom: 2px solid#c77d4e;
  box-shadow: none;
  }


</style>