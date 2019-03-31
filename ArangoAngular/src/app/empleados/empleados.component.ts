// tslint:disable-next-line:max-line-length
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { EmpleadoDTO } from '../model/model';
import { RestService } from '../rest.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { DataTableComponent } from '../data-table/data-table.component';
import { CacheService } from '../cache.service';
import { EmpladoDTOImp } from '../model/empladodtoimp';

@Component({
    selector: 'app-empleados',
    templateUrl: './empleados.component.html',
    styleUrls: ['./empleados.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpleadosComponent implements OnInit {
    @ViewChild(DataTableComponent) dataTable: DataTableComponent;
    displayColumns = ['Nombre', 'Apellidos', 'Username', 'Jefe', 'Departamento', 'edit', 'delete'];
    displayNum = ['', '', '', '', ''];
    isLoading = true;
    empleadosObservable: Observable<EmpleadoDTO[]>;
    constructor(
        public restService: RestService, private router: Router,
        private notifier: NotifierService,
        private cacheService: CacheService) {
        this.empleadosObservable = this.restService.getEmpleados();
        this.isLoading = false;
    }

    ngOnInit() {
        console.log('empleados');
    }

    onSelect(empleado: EmpleadoDTO | null) {
        if (empleado) {
            this.cacheService.cachedData = [empleado];
            this.cacheService.mode = 'EDIT';
        } else {
            this.cacheService.cachedData = [new EmpladoDTOImp()];
            this.cacheService.mode = 'CREATE';
        }
        this.router.navigate(['/editEmpleado']);
    }

    onDelete(empleado: EmpleadoDTO) {
        this.restService.deleteEmpleado(empleado).subscribe(() => {
            // this.empleadosObservable = this.restService.getEmpleados();
            this.dataTable.refresh(this.restService.getEmpleados());
            this.notifier.notify('success', 'Hecho');
        });
    }

}
