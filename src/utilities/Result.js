//Esta funcion tiene un loading por default
export default function(Result, dataName = undefined, data = false) {
  let _Result;

  if (Result.hasOwnProperty("graphQLErrors")) {
    if (Result.graphQLErrors.length > 0) {
      _Result = JSON.parse(Result.graphQLErrors[0].message); //Api parse call usually
    }
  } else {
    if (typeof Result === "string") {
      _Result = JSON.parse(Result);
    } else {
      _Result = Result;
    }
  }
  
  if (_Result.hasOwnProperty("data")) {
    if (dataName !== undefined) {
      if (data) {
        _Result = JSON.parse(_Result.data[`${dataName}`]);
      } else {
        this.data = _Result.data[`${dataName}`];
      }
    } else {
      this.data = _Result.data;
    }
  }

  console.log("Result");
  console.dir(Result);

  console.log("_Result");
  console.dir(_Result);

  this.componenteInterno = _Result.componenteInterno || {};
  this.data = "";
  this.pagina = _Result.pagina || undefined;
  this.log = _Result.Log || undefined;
}
