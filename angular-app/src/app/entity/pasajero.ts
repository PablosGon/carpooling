import { Ubicacion } from "./ubicacion";

export interface Pasajero{

    nombre:string;
    correo:string;
    telefono:string;
    ubicacionRecogida:Ubicacion;
    comentarios:string;

}