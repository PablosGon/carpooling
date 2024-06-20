import { Routes } from '@angular/router';
import { ViajesComponent } from './pages/viajes/components/viajes.component';
import { UsuarioComponent } from './pages/usuarios/components/usuario-details/usuario.component';
import { ViajeComponent } from './pages/viajes/components/viaje-details/viaje.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { SolicitudformComponent } from './pages/viajes/components/viaje-plaza-solicitud-form/solicitudform.component';
import { LoginComponent } from './pages/usuarios/components/usuario-login/login.component';
import { RegisterComponent } from './pages/usuarios/components/usuario-register/register.component';
import { EditusuarioComponent } from './pages/usuarios/components/usuario-edit/editusuario.component';
import { AdminloginComponent } from './pages/admin/components/login/adminlogin.component';
import { AdminComponent } from './pages/admin/components/admin.component';
import { EditComponent } from './pages/viajes/components/viaje-edit/edit.component';
import { CreateComponent } from './pages/viajes/components/viaje-create/create.component';

export const routes: Routes = [
    {
        path:'viaje/:id',
        component:ViajeComponent
    },
    {
        path:'',
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
        path:'admin/:menu',
        component:AdminComponent
    }
];
