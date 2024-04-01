import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViajesComponent } from './viajes/viajes.component';
import { ViajeformComponent } from './viajeform/viajeform.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ViajesComponent, ViajeformComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';
}
