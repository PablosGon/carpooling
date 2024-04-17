import { Ubicacion } from "./ubicacion";
import { Universidad } from "./universidad";

export interface Centro {

    id:string,
    nombre:string,
    ubicacion:Ubicacion,
    universidadId:string
    imagenURL:string

}