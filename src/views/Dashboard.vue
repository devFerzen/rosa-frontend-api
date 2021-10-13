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
              <file-pond ref="refImages" name="filePondImages" itemInsertLocation="after" @init="handleFilePondInit"
                @processfile="imagenesAnuncioOnProcess" @removefile="imagenesAnuncioOnDelete"
                :files="AnuncioEditForm.Sec_Imagen" />
            </v-col>
            <!--Carrusel-->

            <v-col cols="12" md="8" style="min-height: 95vh; max-height: auto"
              class="d-flex flex-column justify-center align-center">
              <v-card class="pa-4 pa-lg-2" outlined style="background-color: lightgrey" tile
                :height="bodyWH['vMainContenth']" :width="bodyWH['vMainContentw']">
                <v-tabs class="d-flex flex-column-reverse">
                  <v-tab-item v-if="anuncioView.Sec_Descripcion">
                    <v-container fluid class="pa-4 pa-lg-8" :class="tabContainerClass['tabContainer']">
                      <v-row no-gutters>
                        <v-col>
                          <div class="text-h4 text-xl-h3 mb-4">Descripción</div>
                        </v-col>
                      </v-row>
                      <!--Título-->
                      <v-form ref="form_anuncioEdicion">
                        <v-row>
                          <v-col cols="6" md="3">
                            <v-text-field v-model="" :rules="" clearable required label="Lorem Ipsum"></v-text-field>
                          </v-col>
                          <v-col cols="6" md="3">
                            <v-text-field v-model="" :rules="" clearable required label="Ipsum Lorem"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <!--EstadoCiudad-->
                      <v-row no-gutters style="overflow: hidden">
                        <v-col>
                          <v-card :height="bodyWH['vTextContent']" flat class="mb-2">
                            <v-form ref="form_anuncioEdicion">
                              <v-textarea counter label="Descripción"></v-textarea>
                            </v-form>
                          </v-card>
                        </v-col>
                      </v-row>
                      <!--Descripcion-->
                    </v-container>
                  </v-tab-item>
                  <!--Sec_Descripcion-->

                  <v-tab-item v-if="anuncioView.Sec_Contacto">
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
                              <v-list-item v-for="(contacto, i) in nuevoContactoList" :key="i" class="my-3">
                                <v-list-item-icon>
                                  <font-awesome-icon :icon="[
                                      contacto.tipo.categoria,
                                      contacto.tipo.icono,
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

                  <v-tab-item v-if="anuncioView.Sec_Tarifas">
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
                          <v-col :cols="bodyWH['CardTarifaCol']" v-for="(tarifa, i) in nuevaTarifaList" :key="i">
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

                  <v-tab v-for="(anuncio, key, i) in anuncioView.permisos" :key="i">
                    {{ anuncio }}
                  </v-tab>
                  <!--nombre tabs-->
                </v-tabs>

                <v-btn class="mx-2" dark color="primary" style="margin-top: 20px;" @click="salvandoNuevoAnuncio(false)">
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
                          v-model="nuevoContacto.tipo" style="width:80px;" filled>
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
    labelIdle:
      'Arrastar y colocar tus imágenes aquí ó <span class="filepond--label-action"> Browse </span>',
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
          tipo: "",
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

        //Par que se usa Anuncio View, ver su anuncio creado por aquí???
        anuncioView: {
          categoria: ["Escorts", "Masajes Eróticos"],
          permisos: ["Descripcion", "Contacto", "Tarifas"],
          Sec_Descripcion: {
            titulo: "Lorem ipsum dolor",
            estado: "1",
            ciudad: "1",
            descripcion: `Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.

            Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.catch fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.`,
          },
          Sec_Contacto: [
            {
              contacto: "811-000-0000",
              tipo: {
                categoria: "fab",
                icono: "whatsapp",
              },
            },
            {
              contacto: "lorem.ipsum",
              url: "",
              tipo: {
                categoria: "fab",
                icono: "twitter",
              },
            },
            {
              contacto: "lorem.ipsum",
              url: "",
              tipo: {
                categoria: "fab",
                icono: "instagram",
              },
            },
            {
              contacto: "lorem.ipsum",
              url: "",
              tipo: {
                categoria: "fa",
                icono: "phone-alt",
              },
            },
            {
              contacto: "lorem.ipsum",
              url: "",
              tipo: {
                categoria: "fa",
                icono: "globe",
              },
            },
          ],
          Sec_Tarifas: [
            {
              nombre: "Lorem 1",
              precio: 1500,
              descripcion:
                "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
            },
            {
              nombre: "Lorem 2",
              precio: 1500,
              descripcion:
                "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
            },
            {
              nombre: "Lorem 3",
              precio: 1500,
              descripcion:
                "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
            },
          ],
          Sec_Imagen: [
            {
              nombre: "",
              url:
                "https://tse4.mm.bing.net/th?id=OIP.4ge4xFDqi-g5CsoZ3cdunwHaLH&pid=Api",
            },
            {
              nombre: "",
              url:
                "https://tse1.explicit.bing.net/th?id=OIP.jF81v_wLUP6MEpMD9mDo-wHaKB&pid=Api",
            },
            {
              nombre: "",
              url:
                "https://tse2.mm.bing.net/th?id=OIP.o8NGR0z2j5kgMMP3eL-hAgHaFn&pid=Api",
            },
          ],
        },
        //Form de un anuncio nuevo
        FormAE: {
          Sec_Descripcion: {
            titulo: '',
            estado: '',
            ciudad: '',
            descripcion: '',
            sexo: ''
          },
          Sec_Imagen: [],
          Sec_Contacto: [],
          Sec_Tarifas: [],
        },
        nuevaTarifaDialog: false,
        nuevoContactoDialog: false,
        anuncioEditDialog: false,
      };
    },
    computed: {
      ...mapGetters(["anunciosUsuario", "idUsuario"]),
      idEditAnuncioDisplay() {
        return this.$store.state.anuncio.dashboardEditAnuncioDisplay;
      },
      nuevoContactoList() {
        return this.AnuncioEditForm.Sec_Contacto;
      },
      nuevaTarifaList() {
        return this.AnuncioEditForm.Sec_Tarifas;
      },
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
    },
    async created() {


    },
    methods: {
      tarifaNueva() {
        let tarifa = {};
        //validacion

        tarifa.nombre = this.nuevaTarifa.nombre;
        tarifa.precio = this.nuevaTarifa.precio;
        tarifa.descripcion = this.nuevaTarifa.descripcion;

        console.log("tarifaNueva...");
        console.dir(tarifa);

        if (this.AnuncioEditForm.Sec_Tarifas.length >= 3) {
          //Sistema de Alerts
          alert("No puedes tener más de tres");
          return;
        }
        this.AnuncioEditForm.Sec_Tarifas.unshift(tarifa);
        this.nuevaTarifaDialog = false;
        this.$refs.tarifaEdit.reset();
      },
      contactoNuevo() {
        let contacto = {};
        //validacion de form
        contacto.tipo = {
          categoria: this.tiposContacto.find(
            (t) => t.icono == this.nuevoContacto.tipo
          ).categoria,
          icono: this.nuevoContacto.tipo,
        };
        contacto.contacto = this.nuevoContacto.contacto;

        console.log("contactoNuevo...");
        console.dir(contacto);

        this.AnuncioEditForm.Sec_Contacto.unshift(contacto);
        this.nuevoContactoDialog = false;
        this.$refs.contactoEdit.reset();
      },
      abriendoEditAnuncioDisplay(InfoAnuncio) {
        this.id = InfoAnuncio.id;
        this.$store.dispatch('dashboardEditAnuncioDisplay', this.id);
      },
      cerrandoEditAnuncioDisplay() {
        this.id = null;
        this.$store.dispatch('dashboardEditAnuncioDisplay', this.id);
      },
      handleFilePondInit() {
        console.log("handleFilePondInit...");
        console.log("getgiles", this.$refs.refImages.getfiles());
        this.$refs.refImages.getfiles();
      },
      async salvandoNuevoAnuncio(isNew) {
        let tipoSalvado = isNew ? "nuevo" : "editado";
        let MutateResult;

        if (this.$refs.form_anuncioEdicion.validate()) {
          try {
            if (tipoSalvado === "nuevo") {
              MutateResult = await this.mixinAnuncioCrear(this.FormAE);
            }

            if (tipoSalvado === "editado") {
              MutateResult = await this.mixinAnuncioEditar(this.FormAE);
            }

          } catch (error) {
            console.log("vue salvandoNuevoAnuncio...");
            //Debe que mandar todo el objeti MixinResult
            console.dir(error);
            //Dispatch de alerta al usuario
            this.$store.dispatch('activationAlert', { type: 'error', message: `>>>Error al registrar...>>>>${error}` });
            //mandar a la vista indicada o pertenecer ahí mismo sin causar error
            //this.mixinLlamadaRouter(error.pagina, error.componenteInterno );
            throw error;
          }

          //Debe que mandar todo el objeti MixinResult
          console.dir(MutateResult);
          //Dispatch de alerta al usuario
          this.$store.dispatch("activationAlert", { type: "success", message: `Anuncio ${MutateResult.mensaje} exitosamente!`, });
          //Dispatch para agregar un nuevo anuncio en la lista del usuario
          //Esconder el modal de edición de anuncio
          this.anuncioEditDialog = false;
        }
        this.$store.dispatch('activationAlert', { type: 'error', message: `Favor de llenar todos los campos requeridos!.` });
      },
      imagenesAnuncioOnDelete(error, file) {
        console.log("imagenesAnuncioOnDelete...");
      },
      imagenesAnuncioOnProcess(error, file) {
        console.log("imagenesAnuncioOnProcess...");
        if (error) {
          console.log("error onProcess", error);
          console.log("file in error", file.file);
          return;
        }

        let objetoImagen = {
          nombre_original: file.filename,
          nombre_werk: JSON.parse(file.serverId)[0],
          tamano: file.fileSize + "",
          extension: file.fileExtension,
          posicion: this.imagenesAnuncio.length,
          path: "Anuncio",
        };
        setTimeout(function () {
          console.log("ImageUploadOnProcess->objetoImagen:", objetoImagen);
        }, 1000);
      },
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