import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
import { LoginComponent } from './login/login.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { RankingComponent } from './ranking/ranking.component';
import { EventosComponent } from './eventos/eventos.component';
import { EditIncidenciaComponent } from './edit-incidencia/edit-incidencia.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { EditDepartamentosComponent } from './edit-departamentos/edit-departamentos.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'empleados', component: EmpleadosComponent },
    { path: 'incidencias', component: IncidenciasComponent },
    { path: 'editEmpleado', component: EditEmployeeComponent },
    { path: 'ranking', component: RankingComponent },
    { path: 'eventos', component: EventosComponent },
    { path: 'editIncidencia', component: EditIncidenciaComponent },
    { path: 'departamentos', component: DepartamentosComponent },
    { path: 'editDepartamento', component: EditDepartamentosComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
