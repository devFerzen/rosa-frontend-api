import * as GraphqlAnuncioCalls from '../graphql/anuncio-mutations';

export default {
    methods: {
        mixinAnuncioEliminar(payload) {
            return new Promise(async(resolve, reject) => {
                let MutateResult;

                try {
                    MutateResult = this.$apollo.mutate({
                        mutation: GraphqlAnuncioCalls.ANUNCIO_ELIMINAR,
                        variables: { id_anuncio: payload }
                    })
                } catch (error) {
                    console.log('Server error...')
                    console.dir(error);
                    reject({ mensaje: `sin éxito!` });
                }
                console.log("MutateResult");
                console.dir(MutateResult);
                resolve(MutateResult);
            });
        }
    }
}