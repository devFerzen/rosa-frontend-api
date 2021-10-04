<template>
    <v-card :loading="herramientasLoader" class="mt-2 rounded-xl d-flex flex-column" max-height="85vh"
        :height="panelCSS.panelCardHeight" min-height="20vh" elevation="2" outlined>

        <v-system-bar height="30">
            <v-spacer></v-spacer>
        </v-system-bar>

        <v-card-text class="pb-0">
            <h6 class="text-h4 text-lg-h4 text-center my-8">Lorem ipsum</h6>

            <v-form ref="verificacion" v-model="valid" lazy-validation>
                <v-text-field v-model="FormAC.nuevaContrasena" :rules="codigoRules" label="Nueva Contraseña" required>
                </v-text-field>
                <v-text-field v-model="FormAC.repetirContrasena" :rules="codigoRules" label="Confirmar Contraseña"
                    required>
                </v-text-field>
                <!--Codigo verificacion-->
            </v-form>
        </v-card-text>

        <v-card-text>
            <v-row align="left" justify="center">
                <v-col cols="12">
                    <div class="text-caption grey--text text--lighten-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et.
                    </div>
                </v-col>
            </v-row>
        </v-card-text>


        <v-row align="center" justify="center">
            <v-card-actions>
                <v-btn depressed elevation="2" color="primary" width="140" :disabled="!valid"
                    @click="actualizarContrasena">
                    Actualizar
                </v-btn>
            </v-card-actions>
        </v-row>
    </v-card>
</template>

<script>
    import GeneralMixins from '../mixins/general-mixins.js';

    export default {
        name: 'contacto',
        mixins: [GeneralMixins],
        components: {
        },
        data() {
            return {
                herramientasLoader: false,
                valid: true,
                FormAC: {
                    nuevaContrasena: '',
                    repetirContrasena: ''
                },
                codigoRules: [
                    v => !!v || 'Código es requerido'
                ],
                panelCSS: {
                    panelCardHeight: '85vh'
                },
            }
        },
        computed: {

        },
        methods: {
            async actualizarContrasena() {
                let mutateResult, params;
                console.log("vue actualizarContrasena...");

                if (!this.$refs.verificacion.validate()) {
                    this.$store.dispatch('activationAlert', { type: 'error', message: `>>>código de verificación con error...>>>>` });
                    return;
                }

                try {
                    params = {
                        input: this.$store.state.usuario.usuario.verificacionUsuario,
                        usuario: this.$store.state.usuario.usuario.usuario,
                        contrasena: this.FormAC.nuevaContrasena
                    }
                    console.dir(params);
                    mutateResult = await this.mixinRestablecerContrasena(params);
                } catch (error) {
                    console.log("vue actualizarContrasena en error...");
                    console.dir(error);
                    this.$store.dispatch('activationAlert', { type: 'error', message: `>>>Error al verificar tu códigio...>>>>${error.mensaje}` });
                    throw error;
                }

                console.dir(mutateResult);
                this.$store.dispatch('panelHerramientasCambioContraseña', false);
                this.$store.dispatch('activationAlert', { type: 'success', message: `${mutateResult.data.restablecerContrasena}` });
            }

        }
    }
</script>
<style>

</style>