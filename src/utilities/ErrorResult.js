export default function(Result = {}) {
    this.mensaje = Result.mensaje || '';
    this.componenteInterno = Result.componenteInterno || {};
    this.data = Result.data || '';
}