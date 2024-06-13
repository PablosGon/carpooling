import { Component, inject } from '@angular/core';
import { ViajeService } from '../../../../services/viaje.service';
import { CentroService } from '../../../../services/centro.service';
import { MunicipioService } from '../../../../services/municipio.service';
import { NucleoService } from '../../../../services/nucleo.service';
import { UniversidadService } from '../../../../services/universidad.service';
import { Viaje } from '../../../../entity/viaje';
import { Municipio } from '../../../../entity/municipio';
import { Centro } from '../../../../entity/centro';
import { Universidad } from '../../../../entity/universidad';
import { Nucleo } from '../../../../entity/nucleo';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormComponent } from '../viaje-form/form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  constructor(private viajeService:ViajeService){}

  updateViaje(viaje:Viaje){
    this.viajeService.updateViaje(viaje.id, viaje).subscribe(data => {
      window.location.href='/viaje/' + viaje.id
    })

  }
}
