import { Routes } from '@angular/router';
import { ViajesComponent } from './components/viajes/viajes.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ViajeComponent } from './components/viaje/viaje.component';
import { CreateComponent } from './components/viajes/create/create.component';

export const routes: Routes = [
    {
        path:'viaje/:id',
        component:ViajeComponent
    },
    {
        path:'viajes',
        component:ViajesComponent
    },
    {
        path:'usuario/:id',
        component:UsuarioComponent
    },
    {
        path:'viajes/crear',
        component:CreateComponent
    }
];
