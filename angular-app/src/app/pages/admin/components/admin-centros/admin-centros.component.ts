import { Component, Input } from '@angular/core';
import { Centro } from '../../../../entity/centro';
import { Buffer } from 'buffer';
import { FormsModule } from '@angular/forms';
import { CentroService } from '../../../../services/centro.service';

@Component({
  selector: 'app-admin-centros',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-centros.component.html',
  styleUrl: './admin-centros.component.css'
})
export class AdminCentrosComponent {

  @Input() universidadId:number = 0
  @Input() centros:Centro[] = []

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

  centroFile : File | null = null
  allowedFileTypes = ["image/png", "image/jpeg"];

  constructor(private centroService:CentroService) {}

  async createCentro(universidadId:number){
    if(this.centroFile){
      this.newCentro.imagen = await this.getBase64(this.centroFile);
    }
    console.log(this.newCentro)
    this.newCentro.universidad.id = universidadId
    this.centroService.createCentro(this.newCentro).subscribe(data => window.location.reload())
  }

  async updateCentro(id:number, centro:Centro){
    if(this.centroFile){
      centro.imagen = await this.getBase64(this.centroFile);
    }
    this.centroService.updateCentro(id, centro).subscribe(data => window.location.reload())
  }

  deleteCentro(id:number){
    this.centroService.deleteCentro(id).subscribe(data => window.location.reload())
  }

  readCentroFile(uniId:number, id?:number){

    let inputFile;
    let elementId = uniId + "cenFile"

    if(id){
      elementId += id
    }

    console.log(elementId)

    inputFile = (<HTMLInputElement> document.getElementById(elementId)).files?.item(0)

    console.log((<HTMLInputElement> document.getElementById(elementId)))

    if(inputFile){
      if(this.allowedFileTypes.includes(inputFile.type)) {
        this.centroFile = inputFile
        document.getElementById(elementId + 'Warning')!.innerText = "";
      } else {
        document.getElementById(elementId + 'Warning')!.innerText = "Tipo de archivo no permitido";
      }
    }

  }

  async getBase64(file:File){
    const arrayBuffer = await file.arrayBuffer();
    const b = Buffer.from(arrayBuffer);
    return "data:image/jpeg;base64," + b.toString('base64')
  }

  deleteCentroPicture(id:number){
    this.centroService.deletePicture(id).subscribe(data => window.location.reload())
  }
}
