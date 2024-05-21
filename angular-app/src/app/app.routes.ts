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
import { AdminviajesComponent } from './components/admin/viajes/adminviajes.component';
import { AdminusuariosComponent } from './components/admin/usuarios/adminusuarios.component';
import { AdminmunicipiosComponent } from './components/admin/municipios/adminmunicipios.component';
import { AdminuniversidadesComponent } from './components/admin/universidades/adminuniversidades.component';

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
        path:'admin/viajes',
        component:AdminviajesComponent
    },
    {
        path:'admin/usuarios',
        component:AdminusuariosComponent
    },
    {
        path:'admin/municipios',
        component:AdminmunicipiosComponent
    },
    {
        path:'admin/universidades',
        component:AdminuniversidadesComponent
    }
];
