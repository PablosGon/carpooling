import { Routes } from '@angular/router';
import { ViajesComponent } from './pages/viajes/components/viajes.component';
import { UsuarioComponent } from './pages/usuarios/components/usuario-details/usuario.component';
import { ViajeComponent } from './pages/viajes/components/viaje-details/viaje.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { SolicitudformComponent } from './components/viaje/solicitudform/solicitudform.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { RegisterComponent } from './components/usuarios/register/register.component';
import { EditusuarioComponent } from './pages/usuarios/components/usuario-edit/editusuario.component';
import { AdminloginComponent } from './components/admin/login/adminlogin.component';
import { AdminviajesComponent } from './components/admin/viajes/adminviajes.component';
import { AdminusuariosComponent } from './components/admin/usuarios/adminusuarios.component';
import { AdminmunicipiosComponent } from './components/admin/municipios/adminmunicipios.component';
import { AdminuniversidadesComponent } from './components/admin/universidades/adminuniversidades.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditComponent } from './pages/viajes/components/viaje-edit/edit.component';
import { CreateComponent } from './pages/viajes/components/viaje-create/create.component';

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
        path:'notificaciones',
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
