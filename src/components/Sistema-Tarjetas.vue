<template>
  <div class="">
    <v-row>
      <v-col cols="4">
        <v-card
          class="rounded-xl"
          style="height:500px; max-height:500px; overflow:hidden; position:relative;">
          <v-img
            lazy-src="https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api"
            max-height="100%"

            contain
            src="https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api"
            style="position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);">
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="rounded-xl"
          style="height:500px; max-height:500px; position:relative; ">
          <v-img
            max-height="100%"
            contain
            lazy-src="https://tse4.mm.bing.net/th?id=OIP.4ge4xFDqi-g5CsoZ3cdunwHaLH&pid=Api"
            src="https://tse4.mm.bing.net/th?id=OIP.4ge4xFDqi-g5CsoZ3cdunwHaLH&pid=Api"
            style="position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);">
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="rounded-xl"
          style="height:500px; max-height:500px; overflow:hidden; position:relative;">
          <v-img
            lazy-src="https://tse1.explicit.bing.net/th?id=OIP.jF81v_wLUP6MEpMD9mDo-wHaKB&pid=Api"
            max-height="100%"
            contain
            src="https://tse1.explicit.bing.net/th?id=OIP.jF81v_wLUP6MEpMD9mDo-wHaKB&pid=Api"
            style="position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);">
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="rounded-xl"
          style="height:500px; max-height:500px; overflow:hidden; position:relative;">
          <v-img
            lazy-src="https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api"
            max-height="100%"
            src="https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api"
            style="position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);">
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="rounded-xl"
          style="height:500px; max-height:500px; position:relative; ">
          <v-img
            max-height="100%"
            lazy-src="https://tse4.mm.bing.net/th?id=OIP.4ge4xFDqi-g5CsoZ3cdunwHaLH&pid=Api"
            src="https://tse4.mm.bing.net/th?id=OIP.4ge4xFDqi-g5CsoZ3cdunwHaLH&pid=Api"
            style="position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);">
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="rounded-xl"
          style="height:500px; max-height:500px; overflow:hidden; position:relative;">
          <v-img
            lazy-src="https://tse1.explicit.bing.net/th?id=OIP.jF81v_wLUP6MEpMD9mDo-wHaKB&pid=Api"
            max-height="100%"
            src="https://tse1.explicit.bing.net/th?id=OIP.jF81v_wLUP6MEpMD9mDo-wHaKB&pid=Api"
            style="position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);">
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="rounded-xl"
          style="height:500px; max-height:500px; overflow:hidden; position:relative;">
          <v-img
            lazy-src="https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api"
            min-height="500px"
            max-height="500px"
            max-width="100%"
            position="center center"
            src="https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api"
            >
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="rounded-xl"
          style="height:500px; max-height:500px; position:relative; ">
          <v-img
            min-height="500px"
            max-height="500px"
            max-width="100%"
            lazy-src="https://tse4.mm.bing.net/th?id=OIP.4ge4xFDqi-g5CsoZ3cdunwHaLH&pid=Api"
            position="center center"
            src="https://tse4.mm.bing.net/th?id=OIP.4ge4xFDqi-g5CsoZ3cdunwHaLH&pid=Api"
            >
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="rounded-xl"
          style="height:500px; max-height:500px; overflow:hidden;">
          <v-img
            lazy-src="https://tse1.explicit.bing.net/th?id=OIP.jF81v_wLUP6MEpMD9mDo-wHaKB&pid=Api"
            min-height="500px"
            max-height="500px"
            max-width="100%"
            position="center center"
            src="https://tse1.explicit.bing.net/th?id=OIP.jF81v_wLUP6MEpMD9mDo-wHaKB&pid=Api"
            >
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
        v-model="fullAnuncioEstado"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >

      <v-card height="80vh">
        <v-container fluid>
          <v-row style="min-height: 95vh;">
            <v-col cols="4" style="background-color:blue;">
              <p>Hi</p>
            </v-col>
            <v-col cols="8" style="background-color:red;">
              <p>Hi2</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog><!--Venta Anuncio Completa-->
  </div>

</template>

<script>
  export default {
    name: 'Sistema-tarjetas',
    data: () => ({
      fullAnuncioEstado: true,
      items:[{
        urlImage: "https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api"
      },{
        urlImage: "https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api"
      },{
        urlImage: "https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api"
      },]
    }),
    methods: {
      fullAnuncio_Display(){
        this.fullAnuncioEstado = true;
      }
    }
  }
</script>
