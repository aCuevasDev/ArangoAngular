import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';

const routes: Routes = [
    { path: '', redirectTo: 'empleados', pathMatch: 'full' },
    { path: 'empleados', component: EmpleadosComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
