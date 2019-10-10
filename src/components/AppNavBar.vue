<template>
  <v-toolbar dark dense class="mars-navbar">
    <!-- START V-TOOLBAR -->
    <v-toolbar-title class="hidden-sm-and-down cernlogo">
      CERN
    </v-toolbar-title>
    <v-toolbar-title class="mars-title hidden-sm-and-down">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <a v-on="on" href="https://readthedocs.web.cern.ch/display/ICKB/MARS%3A+Easing+Maintenance+and+Interventions+for+CERN+controls" target="_blank">M</a>
        </template>
        <span>Need Help?</span>
      </v-tooltip>
      <span>ARS</span>
      </v-toolbar-title>
    <v-toolbar-items>
      <v-btn text active-class="router-active-link" to="/search">
        <span class="down"><i class="fas fa-search"></i> Search</span>
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn text v-if="currentUser"><i class="fas fa-user"></i>
      <span >{{ currentUser }}</span>
    </v-btn>
    <v-btn text v-else @click="login()">
      <span><i  class="fas fa-user"></i> Log In</span>
    </v-btn>
  </v-toolbar>
  <!-- END V-TOOLBAR-->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AppNavBar extends Vue {
  private currentUser: string = '';
  private HOST = 'http://localhost:8080/api';

  private login() {
    window.location.href = `${this.HOST}/api/users/sso?callback=` + encodeURIComponent(document.URL);
  }
}
</script>

<style>

.mars-title {
  margin-right: 10px;
}

.main-content {
  height: calc(100vh - 68px);
} 

.mars-navbar {
  border-bottom: 2px solid#c77d4e;
  box-shadow: none;
  background-color: #212529!important;
}

.cernlogo {
  padding: 5px 5px;
}

</style>