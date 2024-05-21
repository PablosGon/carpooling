import { Routes } from '@angular/router';
import { ViajesComponent } from './components/viajes/viajes.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ViajeComponent } from './components/viaje/viaje.component';
import { CreateComponent } from './components/viajes/create/create.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { SolicitudformComponent } from './components/viaje/solicitudform/solicitudform.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { RegisterComponent } from './components/usuarios/register/register.component';
import { EditComponent } from './components/viajes/edit/edit.component';
import { EditusuarioComponent } from './components/usuario/editusuario/editusuario.component';
import { AdminloginComponent } from './components/admin/login/adminlogin.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminviajesComponent } from './components/admin/viajes/adminviajes.component';

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
    },
    {
        path:'viaje/:id/editar',
        component:EditComponent
    },
    {
        path:'usuario/:id/editar',
        component:EditusuarioComponent
    },
    {
        path:'admin/login',
        component:AdminloginComponent
    },
    {
        path:'admin',
        component:AdminComponent
    },
    {
        path:'admin/viajes',
        component:AdminviajesComponent
    }
];
