import { Centro } from "./centro";
import { Nucleo } from "./nucleo";
import { Pasajero } from "./pasajero";

export interface Viaje {

    id: string,
    conductorId: string,
    hora: Date,
    maxPlazas: number,
    isvuelta: boolean,
    comentarios: string,
    descripcionCoche: string,
    solicitudes: Pasajero[],
    plazas: Pasajero[],
    nucleo: string,
    centro: string,
    precio: number

}
