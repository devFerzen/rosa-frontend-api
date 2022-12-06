<template>
    <v-container fill-height>
        <v-row no-gutters align="center">
            <v-col cols="3">
                <v-progress-linear v-for="n in 2" :key="n" color="pink lighten-2" stream buffer-value="0" value="0"></v-progress-linear>
                <v-progress-linear v-for="n in 2" :key="n" color="pink lighten-2" stream buffer-value="0" value="0"></v-progress-linear>
                <v-progress-linear v-for="n in 2" :key="n" color="pink lighten-2" stream buffer-value="0" value="0"></v-progress-linear>
            </v-col>
            <v-col class="d-flex flex-column align-center" style="height: 60px; background-color: transparent;">
                <v-img alt="Vuetify Logo" class="shrink" contain :src="require('../assets/logos/logoH_1x.png')"
                    width="120px" />
                <div class="subtitle-2">{{ LoadingOptions.texto }}</div>
            </v-col>
            <v-col cols="3">
                <v-progress-linear v-for="n in 2" :key="n" color="pink lighten-2" stream buffer-value="0" value="0"></v-progress-linear>
                <v-progress-linear v-for="n in 2" :key="n" color="pink lighten-2" stream buffer-value="0" value="0"></v-progress-linear>
                <v-progress-linear v-for="n in 2" :key="n" color="pink lighten-2" stream buffer-value="0" value="0"></v-progress-linear>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    name: "loading",
    props: {
        LoadingOptions: { type: Object, default: { icon: true, texto: 'Cargando...' } }
    },
    data() {
        return {

        }
    }
}
</script>