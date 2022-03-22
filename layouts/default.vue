<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      mobileBreakpoint = 'lg'
      app
    >
      <v-list dense nav>
        <v-subheader>CMS RESTTEST</v-subheader>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item nuxt to="/">
            <v-list-item-icon>
              <v-icon color="cyan">mdi-home-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item nuxt to="/about">
            <v-list-item-icon>
              <v-icon color="cyan">mdi-information-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item nuxt to="/contacts">
            <v-list-item-icon>
              <v-icon color="cyan">mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Contacts</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item nuxt to="/auth">
            <v-list-item-icon>
              <v-icon color="cyan">mdi-login-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sign-In/Sign-Up</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="cyan" dense elevation="4" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <div v-if="$auth.loggedIn">
        <app-button @click="$auth.logout()">Logout</app-button>
      </div>
      <div v-else>
        <app-button nuxt to="/auth">Login</app-button>
        <app-button nuxt to="/register">Register</app-button>
      </div>

      <template v-slot:extension>
        <v-tabs v-model="tab" centered>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab nuxt to="/">HOME</v-tab>
          <v-tab nuxt to="/about">ABOUT US</v-tab>
          <v-tab nuxt to="/contacts">CONTACTS</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <Nuxt />
        <the-snack-bar></the-snack-bar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
    name: "default",
    data() {
      return {
        drawer: null,
        tab: null,
        selectedItem: 1
      }
    }
}
</script>
