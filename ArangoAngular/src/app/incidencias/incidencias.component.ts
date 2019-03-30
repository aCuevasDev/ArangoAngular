import { Component, OnInit } from '@angular/core';
import { IncidenciaDTO } from '../model/model';
import { RestService } from '../rest.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {

    displayColumns = ['Nombre', 'Apellidos', 'Username', 'Contrasenya', 'Jefe', 'Departamento', 'edit', 'delete'];
    isLoading = true;
    incidenciaObservable: Observable<IncidenciaDTO[]>;
    constructor(private restService: RestService, private router: Router) {
        this.incidenciaObservable = this.restService.getIncidencias();
        this.isLoading = false;
    }

    ngOnInit() {
        console.log('empleados');
    }

    onSelect(incidencia: IncidenciaDTO | null){
        // this.router.navigate();
    }

    onDelete(incidencia: IncidenciaDTO){
        // this.restService.deleteEmpleado().subscribe();
    }
}
