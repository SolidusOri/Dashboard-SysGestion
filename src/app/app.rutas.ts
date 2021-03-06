import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { Sp1076Component } from './componentes/sp1076/sp1076.component';
import { AutorizaNVComponent } from './componentes/autoriza-nv/autoriza-nv.component';
import { UsuarioGuard } from './guards/usuario.guard';



const RUTAS: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'usuario/registro', component: RegistroComponent },
    { path: 'usuario/login', component: LoginComponent },
    { path: 'consulta/sp1076', component: Sp1076Component, canActivate: [UsuarioGuard] },
    { path: 'venta/autorizaNV', component: AutorizaNVComponent, canActivate: [UsuarioGuard] },
    { path: '**', pathMatch: 'full', redirectTo: 'home' } //aqui ira el componente 404
];

//, { enableTracing: true }  registra movimientos de rutas en la consola del navegador
export const APP_RUTAS = RouterModule.forRoot(RUTAS, {useHash:true} );