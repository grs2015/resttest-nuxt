<template>
  <v-app id="inspire">
    <v-navigation-drawer permanent app>
      <v-system-bar></v-system-bar>
      <v-list>
        <v-list-item>
          <v-list-item-avatar color="red">
            <span class="white--text text-h6">CJ</span>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>{{ $auth.user.fullName }}</v-list-item-title>
            <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-menu bottom left offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list dense nav>
                <v-list-item-group v-model="profileSelectedItem" color="cyan">
                  <v-list-item nuxt to="/admin/profile">
                    <v-list-item-title>Edit profile</v-list-item-title>
                  </v-list-item>
                  <v-list-item nuxt to="/">
                    <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item-group v-model="selectedItem" color="cyan">

          <v-list-item nuxt to="/admin" exact>
            <v-list-item-icon>
              <v-icon color="cyan">mdi-home-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Dashboard Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt to="/admin/customers">
            <v-list-item-icon>
              <v-icon color="cyan">mdi-folder-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Customers</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt to="/admin/users">
            <v-list-item-icon>
              <v-icon color="cyan">mdi-folder-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt to="/admin/orders">
            <v-list-item-icon>
              <v-icon color="cyan">mdi-folder-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Orders</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt to="/admin/products">
            <v-list-item-icon>
              <v-icon color="cyan">mdi-folder-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Products</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt to="/admin/producers">
            <v-list-item-icon>
              <v-icon color="cyan">mdi-folder-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Producers</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt to="/admin/categories">
            <v-list-item-icon>
              <v-icon color="cyan">mdi-folder-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Categories</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt to="/admin/regions">
            <v-list-item-icon>
              <v-icon color="cyan">mdi-folder-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Regions</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item nuxt to="/admin/branches">
            <v-list-item-icon>
              <v-icon color="cyan">mdi-folder-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Branches</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item nuxt to="/logout">
            <v-list-item-icon>
              <v-icon color="cyan">mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="cyan" elevation="4" dark>
      <v-toolbar-title>RESTTEST CMS</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="$auth.loggedIn">
        <app-button @click="$auth.logout()">Logout</app-button>
      </div>
      <template v-slot:extension>
        <v-text-field class="mb-4" clearable flat hide-details label="Search" prepend-inner-icon="mdi-magnify" solo-inverted></v-text-field>
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
  data() {
    return {
      selectedItem: 0,
      profileSelectedItem: 0
    }
  }
}
</script>
