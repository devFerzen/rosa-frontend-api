<template>
  <v-container fluid fill-height class="white">
    <v-row>
      <v-col :cols="colsTarjetaUsuario['colsTarjeta']" v-for="(anuncio, key, i) in anunciosUsuario" :key="i">
        <tarjeta-anuncio-usuario @activandoEdicion="abriendoEditAnuncioDisplay" v-bind:anuncioUsuario="anuncio"
          v-bind:OpcionesAnuncio="opciones">
        </tarjeta-anuncio-usuario>
        <!--Listado de anuncios del usuario -->
        <!--aqui pasar props para activar vista o desactivar vista-->
      </v-col>
    </v-row>

    <v-dialog v-model="idEditAnuncioDisplay" fullscreen hide-overlay persistent transition="dialog-bottom-transition">
      <v-card height="auto">
        <v-container fluid>
          <v-row align="start" justify="center" class="fill-height" no-gutters>
            <v-col cols="12" md="4">
              <file-pond ref="refImages" name="imagenesAnuncioEditDisplay" @init="handleFilePondInit"
                @processfile="imagenesAnuncioOnProcess" :files="imagenesAnuncio" />
            </v-col>
            <!--Carrusel-->

            <v-col cols="12" md="8" style="min-height: 95vh; max-height: auto"
              class="d-flex flex-column justify-center align-center">
              <v-card class="pa-4 pa-lg-2" outlined style="background-color: lightgrey" tile
                :height="bodyWH['vMainContenth']" :width="bodyWH['vMainContentw']">
                <v-tabs class="d-flex flex-column-reverse">
                  <v-tab-item v-if="FormAE.Sec_Descripcion">
                    <v-container fluid class="pa-4 pa-lg-8" :class="tabContainerClass['tabContainer']">
                      <v-row no-gutters>
                        <v-col>
                          <v-text-field v-model="FormAE.Sec_Descripcion.titulo" clearable required label="Titulo"></v-text-field>
                        </v-col>
                      </v-row>
                      <!--Título-->
                      <v-form ref="form_anuncioEdicion">
                        <v-row>
                          <v-col cols="6" md="3">
                            <v-text-field v-model="FormAE.Sec_Descripcion.estado" clearable required label="Estado"></v-text-field>
                          </v-col>
                          <v-col cols="6" md="3">
                            <v-text-field v-model="FormAE.Sec_Descripcion.ciudad" clearable required label="Ciudad"></v-text-field>
                          </v-col>
                          <v-col cols="6" md="3">
                            <v-text-field v-model="FormAE.Sec_Descripcion.sexo" clearable required label="Sexo"></v-text-field>
                          </v-col>

                        </v-row>
                      </v-form>
                      <!--EstadoCiudad-->
                      <v-row no-gutters style="overflow: hidden">
                        <v-col>
                          <v-card :height="bodyWH['vTextContent']" flat class="mb-2">
                            <v-form ref="form_anuncioEdicion">
                              <v-textarea v-model="FormAE.Sec_Descripcion.descripcion" counter label="Descripción"></v-textarea>
                            </v-form>
                          </v-card>
                        </v-col>
                      </v-row>
                      <!--Descripcion-->
                    </v-container>
                  </v-tab-item>
                  <!--Sec_Descripcion-->

                  <v-tab-item v-if="FormAE.Sec_Contacto">
                    <v-container fluid class="pa-4 pa-lg-8" :class="tabContainerClass['tabContainer']">
                      <v-row no-gutters>
                        <v-col>
                          <div class="text-h4 text-xl-h3 mb-4">Contacto</div>
                        </v-col>
                      </v-row>
                      <!--Título-->

                      <v-btn class="mx-2" fab dark small color="primary" :class="tabContainerClass['secContNew']"
                        @click="nuevoContactoDialog = true">
                        <font-awesome-icon :icon="['fas', 'plus-square']" class="fa-2x"></font-awesome-icon>
                      </v-btn>

                      <v-row no-gutters>
                        <v-col>
                          <v-list>
                            <v-list-item-group color="primary" v-model="selectedContactItem">
                              <v-list-item v-for="(contacto, i) in contactoList" :key="i" class="my-3">
                                <v-list-item-icon>
                                  <font-awesome-icon :icon="[
                                      contacto.Tipo.categoria,
                                      contacto.Tipo.icono,
                                    ]" class="tw-redes-icons fa-2x" />
                                </v-list-item-icon>

                                <v-list-item-content>
                                  <v-list-item-title class="text-body-1">
                                    {{ contacto.contacto }}
                                  </v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list-item-group>
                          </v-list>
                        </v-col>
                      </v-row>
                      <!--ContactosList-->
                    </v-container>
                  </v-tab-item>
                  <!--Sec_Contacto-->

                  <v-tab-item v-if="FormAE.Sec_Tarifas">
                    <v-container fluid class="pa-4 pa-lg-8" :class="tabContainerClass['tabContainer']">
                      <v-row no-gutters>
                        <v-col>
                          <div class="text-h4 text-xl-h3 mb-4">Tarifas</div>
                        </v-col>
                      </v-row>
                      <!--Titulo-->

                      <v-btn class="mx-2" fab dark small color="primary" :class="tabContainerClass['secTarNew']"
                        @click="nuevaTarifaDialog = true">
                        <font-awesome-icon :icon="['fas', 'plus-square']" class="fa-2x"></font-awesome-icon>
                      </v-btn>

                      <v-container>
                        <v-row align="center" justify="space-around">
                          <v-col :cols="bodyWH['CardTarifaCol']" v-for="(tarifa, i) in tarifaList" :key="i">
                            <v-card>
                              <v-card-text>
                                <v-row align="center" class="mx-0 mb-2">
                                  <v-card-title>{{
                                    tarifa.nombre
                                    }}</v-card-title>
                                  <font-awesome-icon icon="dollar-sign" class="tw-redes-icons" />
                                  <div class="grey--text ml-2">
                                    {{ tarifa.precio }}
                                  </div>
                                </v-row>
                                <div>{{ tarifa.descripcion }}</div>
                              </v-card-text>

                              <v-divider class="mx-4"></v-divider>

                              <v-card-title>Lorem Ipsum</v-card-title>

                              <v-card-text>
                                <v-chip-group active-class="deep-purple accent-4 white--text" column>
                                  <v-chip>5:30PM</v-chip>

                                  <v-chip>7:30PM</v-chip>
                                </v-chip-group>
                              </v-card-text>

                              <v-card-actions>
                                <v-btn color="deep-purple lighten-2" text>
                                  Lorem
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-container>
                  </v-tab-item>
                  <!--Sec_Tarifas-->

                  <v-tab v-for="(anuncio, key, i) in FormAE.permisos" :key="i">
                    {{ anuncio }}
                  </v-tab>
                  <!--nombre tabs-->
                </v-tabs>

                <v-btn class="mx-2" dark color="primary" style="margin-top: 20px;" @click="salvandoNuevoAnuncio()">
                  <font-awesome-icon :icon="['fas', 'save']" style="margin-right:5px;"></font-awesome-icon>Guardar
                </v-btn>
                <!--SavingButton-->

                <v-btn class="mx-2" fab dark small color="primary" style="float:right"
                  @click="cerrandoEditAnuncioDisplay()">
                  <font-awesome-icon :icon="['fas', 'times']" class="fa-2x"></font-awesome-icon>
                </v-btn>
                <!--CloseButton-->
              </v-card>
            </v-col>
            <!--Cuepo-->
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <!--AnuncioEdit Dialog-->

    <v-dialog v-model="nuevaTarifaDialog" max-width="850px">
      <v-container>
        <v-card rounded>
          <v-card-title>
            <v-avatar size="56">
              <img alt="user" src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg" />
            </v-avatar>
            <div class=" text-h4 text-xl-h3 ml-3">
              Nueva Tarifa
            </div>
          </v-card-title>
          <v-form ref="tarifaEdit">
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field label="Nombre" v-model="nuevaTarifa.nombre" style="margin:9px;"></v-text-field>
                  <v-text-field label="Precio" v-model="nuevaTarifa.precio" prefix="$" style="margin:9px;">
                  </v-text-field>

                  <v-textarea counter label="Descripción" style="margin:9px;" v-model="nuevaTarifa.descripcion">
                  </v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn class="mx-2" dark color="primary" @click="tarifaNueva">
                <font-awesome-icon :icon="['fas', 'save']" class="fa-2x mr-1"></font-awesome-icon>
                Guardar
              </v-btn>
              <v-btn class="mx-2" dark depressed color="error" @click="nuevaTarifaDialog = false">
                <font-awesome-icon :icon="['fas', 'times']" class="fa-2x mr-1"></font-awesome-icon>
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
    </v-dialog>
    <!--NuevaTarifa Dialog-->

    <v-dialog v-model="nuevoContactoDialog" max-width="850px">
      <v-container>
        <v-card rounded>
          <v-card-title>
            <v-avatar size="56">
              <img alt="user" src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg" />
            </v-avatar>

            <div class=" text-h4 text-xl-h3 ml-3">
              Nuevo Contacto
            </div>
          </v-card-title>

          <v-form ref="contactoEdit">
            <v-card-text>
              <v-row>
                <v-col>
                  <v-list>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-autocomplete auto-select-first :items="tiposContacto" item-text="icono" item-value="icono"
                          v-model="nuevoContacto.Tipo" style="width:80px;" filled>
                          <template v-slot:selection="data">
                            <font-awesome-icon :icon="[data.item.categoria, data.item.icono]"></font-awesome-icon>
                          </template>
                          <template v-slot:item="data">
                            <v-list-item-icon>
                              <font-awesome-icon :icon="[data.item.categoria, data.item.icono]"></font-awesome-icon>
                            </v-list-item-icon>
                          </template>
                        </v-autocomplete>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-text-field label="Esribir aquí" v-model="nuevoContacto.contacto">
                          <template v-slot:append-outer>
                            <v-btn class="mx-2" fab dark small color="primary" @click="contactoNuevo">
                              <font-awesome-icon :icon="['fas', 'plus-square']"></font-awesome-icon>
                            </v-btn>
                          </template>
                        </v-text-field>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn class="mx-2" dark color="primary" @click="contactoNuevo">
                <font-awesome-icon :icon="['fas', 'save']" class="fa-2x mr-1"></font-awesome-icon>
                Guardar
              </v-btn>
              <v-btn class="mx-2" dark depressed color="error" @click="nuevoContactoDialog = false">
                <font-awesome-icon :icon="['fas', 'times']" class="fa-2x mr-1"></font-awesome-icon>
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
    </v-dialog>
    <!--NuevoContacto Dialog-->
  </v-container>
</template>

<script>
  import TarjetaAnuncioUsuario from "@/components/TarjetaAnuncioUsuario";
  import { mapGetters } from "vuex";

  import vueFilePond, { setOptions } from "vue-filepond";
  import "filepond/dist/filepond.min.css";
  import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
  import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
  import FilePondPluginImagePreview from "filepond-plugin-image-preview";
  import FilePondPluginFileMetadata from "filepond-plugin-file-metadata";

  import UsuarioMixins from '../mixins/usuario-mixins.js';
  import AnuncioMixins from '../mixins/anuncio-mixins.js';
  import GeneralMixins from '../mixins/general-mixins.js';

  const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview,
    FilePondPluginFileMetadata
  );
  setOptions({
    maxFiles: 6,
    credits: false,
    allowReorder: true,
    allowMultiple: true,
    imagePreviewMaxHeight: 115,
    imagePreviewHeight: 115,
    maxFileSize: "7MB",
    itemInsertLocation: "antes",
    labelFileLoading: "Cargando...",
    labelFileLoadError: "Error durante carga",
    labelFileProcessing: "Cargando...",
    labelFileProcessingComplete: "Carga completada",
    labelFileProcessingAborted: "Carga cancelada",
    labelFileProcessingError: "Error durante carga",
    labelTapToCancel: "Tap para cancelar",
    labelTapToRetry: "Tap para reintentar",
    labelTapToUndo: "Tap para deshacer",
    labelFileSizeNotAvailable: "Tamaño no reconocido",
    labelFileWaitingForSize: "Verificando",
    labelInvalidField: "Archivo no valido",
    labelIdle: 'Arrastar y colocar tus imágenes aquí ó <span class="filepond--label-action"> Browse </span>',
    server: {
      url: 'http://localhost:3000/',
      process: {
        url: 'upload'
      },
      load: 'load/',
      fetch: 'load/'
    },
  });

  export default {
    name: "dashboard",
    mixins: [UsuarioMixins, AnuncioMixins, GeneralMixins],
    props: {
      id: {
        default: false
      }
    },
    components: {
      TarjetaAnuncioUsuario,
      FilePond,
    },
    data() {
      return {
        selectedContactItem: "",
        opciones: {
          Descripcion: {
            permisos: true,
            categoria: "fab",
            icono: "whatsapp",
          },
          Actualizacion: {
            permisos: true,
            categoria: "fas",
            icono: "sync-alt",
          },
          Compras: {
            permisos: true,
            categoria: "fas",
            icono: "shopping-bag",
          },
          Edicion: {
            permisos: true,
            categoria: "fas",
            icono: "pencil-alt",
          },
          Eliminar: {
            permisos: true,
            categoria: "fas",
            icono: "trash-alt",
          },
          Preview: {
            permisos: false,
            categoria: "fas",
            icono: "trash-alt",
          },
        },
        nuevoContacto: {
          Tipo: "",
          contacto: "",
        },
        nuevaTarifa: {
          nombre: "",
          precio: "0.00",
          descripcion: "",
        },
        tiposContacto: [
          { categoria: "fab", icono: "whatsapp" },
          { categoria: "fab", icono: "twitter" },
          { categoria: "fab", icono: "instagram" },
          { categoria: "fa", icono: "phone-alt" },
          { categoria: "fa", icono: "globe" },
        ],
        categorias: [
          {
            name: "Lorem ipsum",
            total: 1,
          },
          {
            name: "Lorem ipsum",
            total: 2,
          },
          {
            name: "Lorem ipsum",
            total: 1,
          },
        ],
        estadosList: [
          {
            id: 1,
            nombre: "NL",
          },
          {
            id: 2,
            nombre: "COAH",
          },
          {
            id: 3,
            nombre: "Q. ROO",
          },
          {
            id: 4,
            nombre: "JAL",
          },
        ],
        ciudadesList: [
          {
            id: 1,
            nombre: "MTY",
          },
          {
            id: 2,
            nombre: "SAL",
          },
          {
            id: 3,
            nombre: "MON",
          },
          {
            id: 4,
            nombre: "CHI",
          },
        ],

        //Form de un anuncio nuevo
        FormAE: {
          categoria: ["Escorts", "Masajes Eróticos"],
          permisos: ["Descripcion", "Contacto", "Tarifas"],
          Sec_Descripcion: {
            titulo: 'titulo test 1',
            estado: 'N.L.',
            ciudad: 'MTY.',
            descripcion: 'una desciprcion',
            sexo: 'm'
          },
          Sec_Imagenes: [],
          Sec_Contacto: [],
          Sec_Tarifas: [],
        },
        nuevaTarifaDialog: false,
        nuevoContactoDialog: false,
        anuncioEditDialog: false,
      };
    },
    computed: {
      ...mapGetters(["anunciosUsuario"]),
      //CSS Properties
      tabContainerClass() {
        const { sm, xs } = this.$vuetify.breakpoint;
        return xs || sm
          ? {
            secContNew: "secContNewMBView",
            secTarNew: "secTarNewMBView",
            tabContainer: "tabContainerMB",
          }
          : {
            secContNew: "secContNewWEBView",
            secTarNew: "secTarNewWEBView",
            tabContainer: "tabContainerWEB",
          };
      },
      bodyWH() {
        const { sm, xs, md } = this.$vuetify.breakpoint;
        return sm || xs || md
          ? {
            vMainContentw: "85vw",
            vMainContenth: "auto",
            vTextContent: "auto",
            CardTarifaCol: 12,
          }
          : {
            vMainContentw: "58vw",
            vMainContenth: "70vh",
            vTextContent: "40vh", //Con la config de tarjetas anuncioUsuario testear
            CardTarifaCol: 4,
          };
      },
      colsTarjetaUsuario() {
        const { xs, sm } = this.$vuetify.breakpoint;
        return xs || sm ? { colsTarjeta: 12 } : { colsTarjeta: 6 };
      },

      //Anuncio edit display
      idEditAnuncioDisplay() {
        return this.$store.state.anuncio.dashboardEditAnuncioDisplay;
      },
      contactoList() {
        return this.FormAE.Sec_Contacto;
      },
      tarifaList() {
        return this.FormAE.Sec_Tarifas;
      },
      imagenesAnuncio() {
        return this.FormAE.Sec_Imagenes.map(function (infoImagen) {
          return { source: infoImagen.nombre, options: { type: 'remote' } };
        });
      }
    },
    methods: {
      tarifaNueva() {
        let tarifa = {};
        //validacion

        tarifa.nombre = this.nuevaTarifa.nombre;
        tarifa.precio = parseInt(this.nuevaTarifa.precio);
        tarifa.descripcion = this.nuevaTarifa.descripcion;

        console.log("tarifaNueva...");
        console.dir(tarifa);

        if (this.FormAE.Sec_Tarifas.length >= 3) {
          //Sistema de Alerts
          alert("No puedes tener más de tres");
          return;
        }
        this.FormAE.Sec_Tarifas.unshift(tarifa);
        this.nuevaTarifaDialog = false;
        this.$refs.tarifaEdit.reset();
      },
      contactoNuevo() {
        let contacto = {};
        //validacion de form
        contacto.Tipo = {
          categoria: this.tiposContacto.find(
            (t) => t.icono == this.nuevoContacto.Tipo
          ).categoria,
          icono: this.nuevoContacto.Tipo,
        };
        contacto.contacto = this.nuevoContacto.contacto;

        console.log("contactoNuevo...");
        console.dir(contacto);

        this.FormAE.Sec_Contacto.unshift(contacto);
        this.nuevoContactoDialog = false;
        this.$refs.contactoEdit.reset();
      },
      abriendoEditAnuncioDisplay(InfoAnuncio) {
        this.id = InfoAnuncio.id;
        this.$store.dispatch('editAnuncioDisplay', this.id);
      },
      cerrandoEditAnuncioDisplay() {
        this.id = null;
        this.$store.dispatch('editAnuncioDisplay', this.id);
      },
      handleFilePondInit() {
        console.log("handleFilePondInit...");
        console.log("getgiles", this.$refs.refImages.getfiles());
        this.$refs.refImages.getfiles();
      },
      async salvandoNuevoAnuncio() {
        let tipoSalvado = this.idEditAnuncioDisplay === '000' ? "nuevo" : "editado";
        let MutateResult;

        if (this.$refs.form_anuncioEdicion.validate()) {
          try {
             //En permisos solo agregarlos si cuenta con información.
            let posicionPermisoContacto = this.FormAE.permisos.indexOf('Contacto');
            this.FormAE.Sec_Contacto.length == 0 ? this.FormAE.permisos.splice(posicionPermisoContacto,1) : ''; 

            let posicionPermisoTarifa = this.FormAE.permisos.indexOf('Tarifas');
            this.FormAE.Sec_Contacto.length == 0 ? this.FormAE.permisos.splice(posicionPermisoTarifa,1) : ''; 

            if (tipoSalvado === "nuevo") {
              this.FormAE.Sec_Imagenes = this.imagenesAnuncio;             
              MutateResult = await this.mixinAnuncioCrear(this.FormAE);
            }

            if (tipoSalvado === "editado") {
              MutateResult = await this.mixinAnuncioEditar(this.FormAE);
            }

          } catch (error) {
            console.log("vue salvandoNuevoAnuncio error...");
            //Debe que mandar todo el objeti MixinResult
            console.dir(error);
            //Dispatch de alerta al usuario
            this.$store.dispatch('activationAlert', { type: 'error', message: `>>>Error al registrar...>>>>${error.mensaje}` });
            //mandar a la vista indicada o pertenecer ahí mismo sin causar error
            this.mixinLlamadaRouter(error);
            throw error;
          }

          console.dir(MutateResult);
          this.$store.dispatch("anuncioAgregarNuevo", MutateResult.data);
          this.$store.dispatch("activationAlert", { type: "success", message: `Anuncio ${MutateResult.mensaje} exitosamente!`, });
          this.cerrandoEditAnuncioDisplay();
          return;
        }
        this.$store.dispatch('activationAlert', { type: 'error', message: `Favor de llenar todos los campos requeridos!.` });
      },
      imagenesAnuncioOnDelete(error, file) {
        console.log("imagenesAnuncioOnDelete...");
        // Quitarlo del arreglo de imagenesAnuncio
      },
      imagenesAnuncioOnProcess(error, file) {
        console.log("imagenesAnuncioOnProcess...");
        if (error) {
          console.log("error onProcess", error);
          console.log("file in error", file.file);
          return;
        }

        let objetoImagen = {
          nombre: JSON.parse(file.serverId)[0] + "." + file.fileExtension,
          posicion: this.imagenesAnuncio.length || 0
        };

        console.dir(objetoImagen);
        this.imagenesAnuncio.push(objetoImagen);
      }

    },
  };
</script>

<style>
  .tw-redes-icons {
    color: blue;
  }

  .filepond--root {
    height: 43em;
    max-height: 43em;
    display: flex;
    flex-wrap: wrap;
  }

  .filepond--item {
    width: calc(45% - 0.5em);
  }

  .secContNewMBView {
    position: absolute;
    top: 1rem;
    left: 9.5rem;
  }

  .secContNewWEBView {
    position: absolute;
    top: 2rem;
    left: 10.5rem;
  }

  .secTarNewMBView {
    position: absolute;
    top: 1.5rem;
    left: 9rem;
  }

  .secTarNewWEBView {
    position: absolute;
    top: 2rem;
    left: 9rem;
  }
</style>