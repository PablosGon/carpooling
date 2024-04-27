import { Usuario } from "./usuario"

export interface Plaza {

    id : number,
    nombre : string,
    correo : string,
    telefono : string,
    latitudRecogida : number,
    longitudRegocida : number,
    comentariosConductor : string,
    comentariosPasajero : string,
    aceptada : boolean,
    usuarioId : number,
    imagen : string,
    viajeId : number
}