import { Component, input } from '@angular/core';
import { Universidad } from '../../../../entity/universidad';
import { Centro } from '../../../../entity/centro';
import { UniversidadService } from '../../../../services/universidad.service';
import { CentroService } from '../../../../services/centro.service';
import { FormsModule } from '@angular/forms';
import { Buffer } from 'buffer';
import { AdminCentrosComponent } from '../admin-centros/admin-centros.component';

@Component({
  selector: 'app-adminuniversidades',
  standalone: true,
  imports: [FormsModule, AdminCentrosComponent],
  templateUrl: './adminuniversidades.component.html',
  styleUrl: './adminuniversidades.component.css'
})
export class AdminuniversidadesComponent {

  universidades:Universidad[] = []
  centros:Centro[] = []

  newUniversidad:Universidad = {
    id: 0,
    nombre: '',
    imagen: ''
  }

  newCentro:Centro = {
    id: 0,
    nombre: '',
    universidad: {
      id: 0,
      nombre: '',
      imagen: ''
    },
    imagen: ''
  }

  universidadFile : File | null = null
  allowedFileTypes = ["image/png", "image/jpeg"];

  constructor(private universidadService:UniversidadService, private centroService:CentroService){}

  ngOnInit(){
    this.universidadService.getUniversidades().subscribe(data => this.universidades = data)
    this.centroService.getCentros().subscribe(data => this.centros = data)
  }

  getCentros(universidadId:number):Centro[]{
    return this.centros.filter(x => x.universidad.id == universidadId)
  }

  async createUniversidad(){
    if(this.universidadFile){
      this.newUniversidad.imagen = await this.getBase64(this.universidadFile);
    }
    this.universidadService.createUniversidad(this.newUniversidad).subscribe(data => window.location.reload())
  }



  async updateUniversidad(id:number, universidad:Universidad){
    if(this.universidadFile){
      universidad.imagen = await this.getBase64(this.universidadFile);
    }
    this.universidadService.updateUniversidad(id, universidad).subscribe(data => window.location.reload())
  }



  deleteUniversidad(id:number){
    this.universidadService.deleteUniversidad(id).subscribe(data => window.location.reload())
  }


  async getBase64(file:File){
    const arrayBuffer = await file.arrayBuffer();
    const b = Buffer.from(arrayBuffer);
    return "data:image/jpeg;base64," + b.toString('base64')
  }

  readUniversidadFile(id?:number){

    let inputFile;
    let elementId = 'uniFile'

    if(id){
      elementId += id
    }

    console.log(elementId)

    inputFile = (<HTMLInputElement> document.getElementById(elementId)).files?.item(0)

    if(inputFile){
      if(this.allowedFileTypes.includes(inputFile.type)) {
        this.universidadFile = inputFile
        document.getElementById(elementId + 'Warning')!.innerText = "";
      } else {
        document.getElementById(elementId + 'Warning')!.innerText = "Tipo de archivo no permitido";
      }
    }
  }



  deleteUniversidadPicture(id:number){
    this.universidadService.deletePicture(id).subscribe(data => window.location.reload())
  }



}
