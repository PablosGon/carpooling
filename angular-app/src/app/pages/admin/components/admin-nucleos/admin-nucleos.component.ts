import { Component, Input } from '@angular/core';
import { Nucleo } from '../../../../entity/nucleo';
import { NucleoService } from '../../../../services/nucleo.service';
import { Buffer } from 'buffer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-nucleos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-nucleos.component.html',
  styleUrl: './admin-nucleos.component.css'
})
export class AdminNucleosComponent {

  @Input() public nucleos:Nucleo[] = []
  @Input() public municipioId:number = 0

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

  constructor(private nucleoService:NucleoService){}

  nucleoFile : File | null = null
  allowedFileTypes = ["image/png", "image/jpeg"];

  async getBase64(file:File){
    const arrayBuffer = await file.arrayBuffer();
    const b = Buffer.from(arrayBuffer);
    return "data:image/jpeg;base64," + b.toString('base64')
  }

  async createNucleo(municipioId:number){
    if(this.nucleoFile){
      this.newNucleo.imagen = await this.getBase64(this.nucleoFile)
    }
    this.newNucleo.municipio.id = municipioId
    this.nucleoService.createNucleo(this.newNucleo).subscribe(data => window.location.reload())
  }

  async updateNucleo(id:number, nucleo:Nucleo){
    if(this.nucleoFile){
      nucleo.imagen = await this.getBase64(this.nucleoFile)
    }
    this.nucleoService.updateNucleo(id, nucleo).subscribe(data => window.location.reload())
  }

  deleteNucleo(id:number){
    this.nucleoService.deleteNucleo(id).subscribe(data => window.location.reload())
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

  deleteNucleoPicture(id:number){
    this.nucleoService.deletePicture(id).subscribe(data => window.location.reload())
  }

}
