import { Routes } from '@angular/router';
import { ViajeComponent } from './viaje/viaje.component';
import { ViajesComponent } from './viajes/viajes.component';

export const routes: Routes = [
    {
        path:'viaje/:id',
        component:ViajeComponent
    },
    {
        path:'viajes',
        component:ViajesComponent
    }
];
