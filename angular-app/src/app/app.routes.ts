import { Routes } from '@angular/router';
import { ViajesComponent } from './components/viajes/viajes.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';
import { ViajeComponent } from './components/viaje/viaje.component';
import { CreateComponent } from './components/viajes/create/create.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { SolicitudformComponent } from './components/viaje/solicitudform/solicitudform.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { RegisterComponent } from './components/usuarios/register/register.component';

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
    },
    {
        path:'usuario/:id/notificaciones',
        component:NotificacionesComponent
    },
    {
        path:'viaje/:id/solicitud',
        component:SolicitudformComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    }
];
