import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { ViajesComponent } from './viajes/viajes.component';
import { ViajeformComponent } from './viajeform/viajeform.component';
import { ViajeComponent } from './viaje/viaje.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ViajesComponent, ViajeformComponent, ViajeComponent, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';
}
