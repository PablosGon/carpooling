import { Component } from '@angular/core';
import { FormComponent } from '../viaje-form/form.component';
import { ViajeService } from '../../../../services/viaje.service';
import { Viaje } from '../../../../entity/viaje';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  constructor(private viajeService:ViajeService){}

  newViaje(viaje:Viaje){
    this.viajeService.postViaje(viaje).subscribe(data => {
      window.location.href='/viaje/' + data.id
    })
  }

}
