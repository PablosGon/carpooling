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
    this.municipioService.createMunicipio(this.newMunicipio).subscribe()
    window.location.reload()
  }

  async createNucleo(municipioId:number){
    if(this.nucleoFile){
      this.newNucleo.imagen = await this.getBase64(this.nucleoFile)
    }
    this.newNucleo.municipio.id = municipioId
    this.nucleoService.createNucleo(this.newNucleo).subscribe()
    window.location.reload()
  }

  async updateMunicipio(id:number, municipio:Municipio){
    if(this.municipioFile){
      municipio.imagen = await this.getBase64(this.municipioFile)
    }
    this.municipioService.updateMunicipio(id, municipio).subscribe()
    window.location.reload()
  }

  async updateNucleo(id:number, nucleo:Nucleo){
    if(this.nucleoFile){
      nucleo.imagen = await this.getBase64(this.nucleoFile)
    }
    this.nucleoService.updateNucleo(id, nucleo).subscribe()
    //window.location.reload()
  }

  deleteMunicipio(id:number){
    this.municipioService.deleteMunicipio(id).subscribe()
    window.location.reload()
  }

  deleteNucleo(id:number){
    this.nucleoService.deleteNucleo(id).subscribe()
    window.location.reload()
  } 

  async getBase64(file:File){
    const arrayBuffer = await file.arrayBuffer();
    const b = Buffer.from(arrayBuffer);
    return "data:image/jpeg;base64," + b.toString('base64')
  }

  readMunicipioFile(id?:number){

    let inputFile;
    if(id){
      inputFile = (<HTMLInputElement> document.getElementById("munFile" + id.toString())).files?.item(0)
    } else {
      inputFile = (<HTMLInputElement> document.getElementById("munFile")).files?.item(0)
    }
    if(inputFile){
      this.municipioFile = inputFile
    }
  }

  readNucleoFile(id?:number){
    
    let inputFile;
    if(id){
      inputFile = (<HTMLInputElement> document.getElementById("nucFile" + id.toString())).files?.item(0)
    } else {
      inputFile = (<HTMLInputElement> document.getElementById("nucFile")).files?.item(0)
    }
    if(inputFile){
      this.nucleoFile = inputFile
    }

  }

}
