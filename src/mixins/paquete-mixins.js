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
    mixinBuscarPaquetes() {
      return new Promise(async (resolve, reject) => {
        let QueryResult, MixinResult;

        console.log("mixinBuscarAnuncioId...");

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

        MixinResult = {
          ...new Respuesta(QueryResult.data, "queryPaquetes", true),
        };
        return resolve(MixinResult.data);
      });
    },
  },
};
