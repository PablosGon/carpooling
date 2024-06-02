import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Municipio } from '../../../entity/municipio';
import { Nucleo } from '../../../entity/nucleo';
import { NucleoService } from '../../../services/nucleo.service';
import { MunicipioService } from '../../../services/municipio.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-adminmunicipios',
  standalone: true,
  imports: [FormsModule],
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

  newNucleo:Nucleo = {
    id: 0,
    nombre: '',
    imagen: '',
    municipio: {
      id: 0,
      nombre: '',
      imagen: ''
    }
  }

  municipioFile : File | null = null
  nucleoFile : File | null = null
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

  async createNucleo(municipioId:number){
    if(this.nucleoFile){
      this.newNucleo.imagen = await this.getBase64(this.nucleoFile)
    }
    this.newNucleo.municipio.id = municipioId
    this.nucleoService.createNucleo(this.newNucleo).subscribe(data => window.location.reload())
  }

  async updateMunicipio(id:number, municipio:Municipio){
    if(this.municipioFile){
      municipio.imagen = await this.getBase64(this.municipioFile)
    }
    this.municipioService.updateMunicipio(id, municipio).subscribe(data => window.location.reload())
  }

  async updateNucleo(id:number, nucleo:Nucleo){
    console.log(this.municipioFile)
    if(this.nucleoFile){
      nucleo.imagen = await this.getBase64(this.nucleoFile)
    }
    this.nucleoService.updateNucleo(id, nucleo).subscribe(data => window.location.reload())
  }

  deleteMunicipio(id:number){
    this.municipioService.deleteMunicipio(id).subscribe(data => window.location.reload())
  }

  deleteNucleo(id:number){
    this.nucleoService.deleteNucleo(id).subscribe(data => window.location.reload())
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

  readNucleoFile(munId:number, id?:number){
    
    let inputFile;

    let elementId = munId + 'nucFile'

    if(id){
      elementId += id
    }

    inputFile = (<HTMLInputElement> document.getElementById(elementId)).files?.item(0)

    if(inputFile){
      if(this.allowedFileTypes.includes(inputFile.type)) {
        this.nucleoFile = inputFile
        document.getElementById(elementId + "Warning")!.innerText = "";
      } else {
        document.getElementById(elementId + "Warning")!.innerText = "Tipo de archivo no permitido";
      }
    }

  }

}
