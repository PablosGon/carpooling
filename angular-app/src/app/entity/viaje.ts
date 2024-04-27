import { Centro } from "./centro";
import { Nucleo } from "./nucleo";
import { Usuario } from "./usuario";

export interface Viaje {

    id: number,
    fechaYHora: Date,
    maxPlazas: number,
    comentarios: string,
    descripcionCoche: string,
    isVuelta: boolean,
    precio: number,
    centro: Centro,
    nucleo: Nucleo,
    conductor: Usuario
}
