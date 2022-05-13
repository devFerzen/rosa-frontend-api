<template>
  <v-card flat class="pa-0" style="background-color: #f1f0ef;height: 421px;">
    <file-pond
    ref="pond"
    name="filePondImages"
    @init="handleFilePondInit"
    :files="imagenesAnuncioFilePond"
    @processfile="imagenesAnuncioOnProcess"
    @removefile="imagenesAnuncioOnDelete"
    />
  </v-card>
</template>

<script>
import vueFilePond, { setOptions } from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileMetadata from "filepond-plugin-file-metadata";
import AnuncioMixins from "../mixins/anuncio-mixins.js";
import GeneralMixins from "../mixins/general-mixins.js";

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
  imagePreviewMaxHeight: 80,
  imagePreviewHeight: 80,
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
    'Arrastar y colocar tus imágenes aquí ó <span class="filepond--label-action"> Explorar </span>',
  server: {
    url: "http://localhost:3000/",
    process: {
      url: "upload",
    },
    load: "uploads/",
    fetch: "uploads/",
    revert: "delete/",
  },
});

export default {
  name: "file-pond-imagenes-Anuncio",
  mixins: [AnuncioMixins, GeneralMixins],
  components: {
    FilePond,
  },
  props: {
    imagenes: { type: Array, default: [] },
  },
  data() {
    return {};
  },
  computed: {
    imagenesAnuncioFilePond() {
      return this.imagenes.map(function(infoImagen) {
        if (!!infoImagen.source) {
          return {
            source: infoImagen.source,
            options: { type: "local" },
          };
        }
      });
    },
  },
  methods: {
    //FilePondMethods
    handleFilePondInit() {
      console.log("handleFilePondInit");
    },
    async imagenesAnuncioOnDelete(error, file) {
      let MutateResult;
      let _New_Sec_Imagenes = [];

      console.log("imagenesAnuncioOnDelete... file");
      console.dir(file);

      if (error) {
        console.log("error onProcess", error);
        console.log("file in error", file.file);
        return;
      }

      //Salvando en un objeto antes de que la variable file sea eliminada
      let ObjetoImagenDelete = {
        nombre: file.filename,
      };

      //Verificar si esta la imagen antes de eliminar

      try {
        MutateResult = await this.mixinImagenDelete(ObjetoImagenDelete.nombre);
      } catch (error) {
        console.dir(error);
        this.mixinLlamadaRouter(error);
      }

      this.$emit("iAOnDelete", { imageToDelete: ObjetoImagenDelete.nombre });
    },
    imagenesAnuncioOnProcess(error, file) {
      console.log("imagenesAnuncioOnProcess...");

      if (error) {
        //Error Object de filepond
        console.log("error onProcess", error);
        console.log("file in error", file.file);
        return;
      }

      let ObjetoImagen = {
        nombre: JSON.parse(file.serverId)[0],
        posicion: this.imagenesAnuncioFilePond.length || 0,
      };
      console.dir(ObjetoImagen);

      this.$emit("iAOnProcess", { ...ObjetoImagen });
    },
  },
};
</script>

<style lang="scss">
.filepond--root {
  display: flex;
  flex: column;
  min-height: 421px;
  max-height: 421px;
}

.filepond--item {
  width: auto;
}
</style>
