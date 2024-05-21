import { Component } from '@angular/core';
import { Universidad } from '../../../entity/universidad';
import { Centro } from '../../../entity/centro';
import { UniversidadService } from '../../../services/universidad.service';
import { CentroService } from '../../../services/centro.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminuniversidades',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adminuniversidades.component.html',
  styleUrl: './adminuniversidades.component.css'
})
export class AdminuniversidadesComponent {

  universidades:Universidad[] = []
  centros:Centro[] = []

  newUniversidad:Universidad = {
    id: 0,
    nombre: ''
  }

  newCentro:Centro = {
    id: 0,
    nombre: '',
    universidad: {
      id: 0,
      nombre: ''
    },
    imagen: ''
  }

  constructor(private universidadService:UniversidadService, private centroService:CentroService){}

  ngOnInit(){
    this.universidadService.getUniversidades().subscribe(data => this.universidades = data)
    this.centroService.getCentros().subscribe(data => this.centros = data)
  }

  getCentros(universidadId:number):Centro[]{
    return this.centros.filter(x => x.universidad.id == universidadId)
  }

  createUniversidad(){
    this.universidadService.createUniversidad(this.newUniversidad).subscribe()
    window.location.reload()
  }

  createCentro(universidadId:number){
    this.newCentro.universidad.id = universidadId
    this.centroService.createCentro(this.newCentro).subscribe()
    window.location.reload()
  }

  updateUniversidad(id:number, universidad:Universidad){
    this.universidadService.updateUniversidad(id, universidad).subscribe()
    window.location.reload()
  }

  updateCentro(id:number, centro:Centro){
    this.centroService.updateCentro(id, centro).subscribe()
    window.location.reload()
  }

  deleteUniversidad(id:number){
    this.universidadService.deleteUniversidad(id).subscribe()
    window.location.reload()
}

  deleteCentro(id:number){
    this.centroService.deleteCentro(id).subscribe()
    window.location.reload()
}

}
