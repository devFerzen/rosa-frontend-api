import * as GraphqlPaqueteCalls from "../graphql/paquete-mutations";
import Respuesta from "../utilities/Result";

export default {
  data() {
    return {
      MixinResult: {
        pagina: null,
        componenteInterno: null,
        data: null,
      },
    };
  },
  methods: {
    cleanMixinResult() {
      this.MixinResult.pagina = null;
      this.MixinResult.componenteInterno = null;
      this.MixinResult.mensaje = "";
      this.MixinResult.data = null;
    },
    mixinBuscarPaquetes() {
      return new Promise(async (resolve, reject) => {
        let QueryResult;
        console.log("mixinBuscarAnuncioId...");
        this.cleanMixinResult();

        try {
          QueryResult = await this.$apollo.query({
            query: GraphqlPaqueteCalls.PAQUETES_QUERY,
            variables: {},
          });
        } catch (error) {
          console.log("mixinBuscarAnuncioId Mutation error...");
          console.dir(error); // Guardarlo en un log el error.mensage o completo.
          return reject(new Respuesta(error));
        }
        console.log("QueryResult...");

        console.dir(QueryResult);

        this.MixinResult = {
          ...this.MixinResult,
          ...new Respuesta(QueryResult.data, "queryPaquetes", true),
        };
        return resolve(this.MixinResult.data);
      });
    },
  },
};
