<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center mx-3" style="cursor:pointer;">
        <v-img alt="Vuetify Logo" class="shrink" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"
          @click="$router.push({path:'/'}); $store.dispatch('panelHerramientasRegistro', false); $store.dispatch('panelHerramientasInicioSesion', false);" />
      </div>

      <v-row align="center" justify="end">
        <v-btn tile depressed raised class="mr-2 rounded-lg" :class="btnClasses['btnClass']" color="light-blue accent-3"
          @click="creandoAnuncio">
          <v-icon>perm_identity</v-icon>
          <span class="ml-2" :class="btnClasses['span']">Anunciaté</span>
        </v-btn>
        <!--Btn Anunciate-->

        <v-btn outlined color="white" class="mx-2 rounded-lg" :class="btnClasses['btnClass']" @click="iniciandoSesion"
          v-if="!this.$store.state.usuario.token">
          <v-icon>perm_identity</v-icon>
          <span class="ml-2" :class="btnClasses['span']">Login Usuario</span>
        </v-btn>
        <!--Btn Login-->

        <v-btn outlined color="white" class="mx-2 rounded-lg" @click="sideDashboard = !sideDashboard" v-else>
          <v-icon>perm_identity</v-icon>
          <span class="ml-2" :class="btnClasses['span']">Dashboard</span>
        </v-btn>
        <!--Btn Dashboard-->
      </v-row>
    </v-app-bar>

    <v-navigation-drawer v-model="sideDashboard" absolute bottom temporary>
      <div class="d-flex flex-row mb-8">
        <div>
          <v-img alt="Vuetify Logo" class="shrink" contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition"
            width="40" />
        </div>
        <v-btn fab small depressed color="white" class="ml-auto" @click="sideDashboard = !sideDashboard">
          <font-awesome-icon :icon="['fas','times']" class="fa-2x"></font-awesome-icon>
        </v-btn>
      </div>
      <!--Sidedar Header-->

      <div class="text-h5 text-xl-h6 mb-1 font-weight-bold text-center">
        Lorem Ipsum
      </div>
      <!--Sidedar Tile-->

      <div class="subtitle-1 text-center mb-8">
        Lorem Ipsum
      </div>
      <!--Sidedar Subtile-->

      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">

          <v-list-item @click="$router.push({path:'/dashboard'})">
            <v-list-item-title class="text-center">Mis Anuncios</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push({path:'/compras'})">
            <v-list-item-title class="text-center">Compras</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push({path:'/contactanos'})">
            <v-list-item-title class="text-center">Contactanos</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-center">Cerrar Sesion</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
      <!--Sidedar List views-->
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-alert border="bottom" colored-border :type="Alert.type" :value="Alert.isActive" elevation="2" dismissible
      transition="slide-x-reverse-transition"
      style="position: absolute; top: 80px; z-index:2; right: 0; width: 50%; height:65px;">
      {{Alert.message}}
    </v-alert>
  </v-app>
</template>

<script>

  export default {
    name: 'App',

    data() {
      return {
        sideDashboard: false
      }
    },
    computed: {
      Alert() {
        return this.$store.state.alert.alert;
      },
      btnClasses() {
        const { xs, sm } = this.$vuetify.breakpoint;
        return xs || sm ? { 'span': 'hidden', 'btnClass': 'btn-menu-mbview' } : { 'span': '', 'btnClass': 'btn-menu-pcview' };
      }
    },
    methods: {
      iniciandoSesion() {
        this.$store.dispatch('panelHerramientasInicioSesion', true);
      },
      usuarioLoggeado() {
        return this.$store.state.usuario.token;
      },
      creandoAnuncio() {
        //Si si ha iniciado sesion pero no esta en deashboard hay que dirigirlo
        //hacia allá, si no que abrá el modal

        //luego crear el dashboard click que abrá en si el sidebar
        this.$store.dispatch('creandoAnuncio', null)
          .then((result) => {
            if (!!result.sendTo && result.sendTo == "dashboard") {
              console.log("creandoAnuncio en éxito...");
              console.log(result);
              //Problemas con el routing que actualize qle query prop
              this.$router.push({ name: 'dashboard', query: { id: '000' } });
            }
          })
          .catch((error) => {
            //notificar el error al usuario
            console.log("creandoAnuncio en error...");
            console.log(error.mensaje);
            this.$router.push({ name: 'home' });
            this.$store.dispatch('panelHerramientasRegistro', true);
          });
      }
    },
    created() {
    }
  };
</script>

<style scoped>
  .btn-menu-mbview {}

  .btn-menu-pcview {
    width: 185px;
  }
</style>