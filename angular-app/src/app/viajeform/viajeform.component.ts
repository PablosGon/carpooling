import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-viajeform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './viajeform.component.html',
  styleUrl: './viajeform.component.css'
})
export class ViajeformComponent {

  centro = new FormControl()
  nucleo = new FormControl()
  fecha = new FormControl()
  isVuelta = new FormControl()

}
