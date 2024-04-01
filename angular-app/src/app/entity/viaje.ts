export class Viaje {

    id: string;
    nucleo: string;
    centro: string;
    hora: string;
    isvuelta: boolean;

    constructor(id:string, nucleo:string, centro:string, hora:string, isvuelta:boolean){
        this.id = id;
        this.nucleo = nucleo;
        this.centro = centro;
        this.hora = hora;
        this.isvuelta = isvuelta;
    }

}
