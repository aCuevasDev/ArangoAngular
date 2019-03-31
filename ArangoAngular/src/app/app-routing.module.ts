import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
import { LoginComponent } from './login/login.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { RankingComponent } from './ranking/ranking.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'empleados', component: EmpleadosComponent },
    { path: 'incidencias', component: IncidenciasComponent },
    { path: 'editEmpleado', component: EditEmployeeComponent },
    { path: 'ranking', component: RankingComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
