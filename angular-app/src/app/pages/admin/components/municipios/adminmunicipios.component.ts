import { Component, Input, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Municipio } from '../../../../entity/municipio';
import { Nucleo } from '../../../../entity/nucleo';
import { NucleoService } from '../../../../services/nucleo.service';
import { MunicipioService } from '../../../../services/municipio.service';
import { Buffer } from 'buffer';
import { AdminNucleosComponent } from '../admin-nucleos/admin-nucleos.component';

@Component({
  selector: 'app-adminmunicipios',
  standalone: true,
  imports: [FormsModule, AdminNucleosComponent],
  templateUrl: './adminmunicipios.component.html',
  styleUrl: './adminmunicipios.component.css'
})
export class AdminmunicipiosComponent {

  municipios:Municipio[] = []
  nucleos:Nucleo[] = []

  newMunicipio:Municipio = {
    id: 0,
    nombre: '',
    imagen: ''
  }

  municipioFile : File | null = null
  allowedFileTypes = ["image/png", "image/jpeg"];

  constructor(private municipioService:MunicipioService, private nucleoService:NucleoService){}

  ngOnInit(){
    this.municipioService.getMunicipios().subscribe(data => this.municipios = data)
    this.nucleoService.getNucleos().subscribe(data => this.nucleos = data)
  }

  getNucleos(municipioId:number):Nucleo[]{
    return this.nucleos.filter(x => x.municipio.id == municipioId)
  }

  async createMunicipio(){
    if(this.municipioFile){
      this.newMunicipio.imagen = await this.getBase64(this.municipioFile)
    }
    this.municipioService.createMunicipio(this.newMunicipio).subscribe(data => window.location.reload())
  }

  async updateMunicipio(id:number, municipio:Municipio){
    if(this.municipioFile){
      municipio.imagen = await this.getBase64(this.municipioFile)
    }
    this.municipioService.updateMunicipio(id, municipio).subscribe(data => window.location.reload())
  }

  deleteMunicipio(id:number){
    this.municipioService.deleteMunicipio(id).subscribe(data => window.location.reload())
  }

  async getBase64(file:File){
    const arrayBuffer = await file.arrayBuffer();
    const b = Buffer.from(arrayBuffer);
    return "data:image/jpeg;base64," + b.toString('base64')
  }

  readMunicipioFile(id?:number){

    let inputFile;

    let elementId = 'munFile'

    if(id){
      elementId += id
    }

    inputFile = (<HTMLInputElement> document.getElementById(elementId)).files?.item(0)


    if(inputFile){
      if(this.allowedFileTypes.includes(inputFile.type)) {
        this.municipioFile = inputFile
        document.getElementById("munFileWarning" + id)!.innerText = "";
      } else {
        document.getElementById("munFileWarning" + id)!.innerText = "Tipo de archivo no permitido";
      }
    }
  }



  deleteMunicipioPicture(id:number){
    this.municipioService.deletePicture(id).subscribe(data => window.location.reload())
  }



}
