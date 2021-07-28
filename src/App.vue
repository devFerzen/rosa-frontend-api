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
           @click="creandoAnuncio">
          <v-icon>perm_identity</v-icon>
          <span class="ml-2">Anunciaté</span>
        </v-btn>

        <v-btn
          outlined
          color="white"
          class="mx-3 rounded-lg"
          @click="iniciandoSesion">
          <v-icon>perm_identity</v-icon>
          <span>Login Usuario</span>
        </v-btn>
      </v-row>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    iniciandoSesion(){
      this.$store.dispatch('activandoInicioSesion', true);
    },
    creandoAnuncio () {
      this.$store.dispatch('creandoAnuncio', null)
      .then((result)=> {
          console.log("creandoAnuncio en éxito...");
          console.log(result);
          this.$store.dispatch('activandoRegistro',false);
      })
      .catch((error)=> {
        if(!!error.activeTo && error.activeTo == 'registro'){
          this.$store.dispatch('activandoRegistro',true);
        }
        if(!!error.activeTo && error.activeTo == 'creacionAnuncio'){
          console.log("aqui va el push route para crear Anuncio");
        }
        //notificar el error al usuario
        console.log("creandoAnuncio en error...");
        console.log(error.mensaje);
      });
    }
  }
};
</script>
