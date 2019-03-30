import { Component, OnInit } from '@angular/core';
import { EmpleadoDTO } from '../model/model';
import { RestService } from '../rest.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-empleados',
    templateUrl: './empleados.component.html',
    styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

    displayColumns = ['Nombre', 'Apellidos', 'Username', 'Contrasenya', 'Jefe', 'Departamento', 'edit', 'delete'];
    isLoading = true;
    empleadosObservable: Observable<EmpleadoDTO[]>;
    constructor(private restService: RestService, private router: Router) {
        this.empleadosObservable = this.restService.getEmpleados();
        this.isLoading = false;
    }

    ngOnInit() {
        console.log('empleados');
    }

    onSelect(empleado: EmpleadoDTO | null){
        // this.router.navigate();
    }

    onDelete(empleado: EmpleadoDTO){
        // this.restService.deleteEmpleado().subscribe();
    }

}
