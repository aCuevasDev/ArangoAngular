import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EventosComponent } from './eventos/eventos.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { RankingComponent } from './ranking/ranking.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { PrimeNGModule } from './primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    EmpleadosComponent,
    EventosComponent,
    IncidenciasComponent,
    RankingComponent,
    DataTableComponent,
    DepartamentosComponent,
    SpinnerComponent,
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    PrimeNGModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
