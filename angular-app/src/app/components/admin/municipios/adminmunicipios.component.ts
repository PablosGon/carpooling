import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Municipio } from '../../../entity/municipio';
import { Nucleo } from '../../../entity/nucleo';
import { NucleoService } from '../../../services/nucleo.service';
import { MunicipioService } from '../../../services/municipio.service';

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
    nombre: ''
  }

  newNucleo:Nucleo = {
    id: 0,
    nombre: '',
    imagen: '',
    municipio: {
      id: 0,
      nombre: ''
    }
  }

  constructor(private municipioService:MunicipioService, private nucleoService:NucleoService){}

  ngOnInit(){
    this.municipioService.getMunicipios().subscribe(data => this.municipios = data)
    this.nucleoService.getNucleos().subscribe(data => this.nucleos = data)
  }

  getNucleos(municipioId:number):Nucleo[]{
    return this.nucleos.filter(x => x.municipio.id == municipioId)
  }

  createMunicipio(){
    this.municipioService.createMunicipio(this.newMunicipio).subscribe()
    window.location.reload()
  }

  createNucleo(universidadId:number){
    this.newNucleo.municipio.id = universidadId
    this.nucleoService.createNucleo(this.newNucleo).subscribe()
    window.location.reload()
  }

  updateMunicipio(id:number, municipio:Municipio){
    this.municipioService.updateMunicipio(id, municipio).subscribe()
    window.location.reload()
  }

  updateNucleo(id:number, nucleo:Nucleo){
    this.nucleoService.updateNucleo(id, nucleo).subscribe()
    window.location.reload()
  }

  deleteMunicipio(id:number){
    this.municipioService.deleteMunicipio(id).subscribe()
    window.location.reload()
}

  deleteNucleo(id:number){
    this.nucleoService.deleteNucleo(id).subscribe()
    window.location.reload()
}

}
