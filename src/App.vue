<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark>
      <div class="d-flex align-center mx-3">
        <v-img
          alt="Vuetify Logo"
          class="shrink"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>


      <v-row
        align="center"
        justify="end">
        <v-btn
          tile
          depressed
          raised
          width="185"
          min-width="185"
          class="mr-2 rounded-lg"
          color="light-blue accent-3"
          >
          <v-icon>perm_identity</v-icon>
          <span class="ml-2">Anunciaté</span>
        </v-btn>

        <v-btn
          outlined
          color="white"
          class="mx-3 rounded-lg">
          <v-icon>perm_identity</v-icon>
          <span>Login Usuario</span>
        </v-btn>
      </v-row>

    </v-app-bar>

    <v-main>
      <v-container fluid fill-height class="white">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
