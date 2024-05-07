import { Municipio } from "./municipio"
import { Universidad } from "./universidad"

export interface Usuario{

    id : number,
    nombre : string,
    correo : string,
    pass : string,
    telefono : string,
    grado : string,
    imagen : string,
    universidad : Universidad,
    municipio : Municipio
    valoracionMedia: number,
    numValoraciones: number,
    notificacionesNoLeidas: number
}