import { Component, OnInit } from '@angular/core';
import { CacheService } from '../cache.service';
import { EmpleadoDTO } from '../model/model';
import { RestService } from '../rest.service';
import { NotifierService } from 'angular-notifier';
import { NavigationService } from '../navigation.service';
import { EmpladoDTOImp } from '../model/empladodtoimp';

@Component({
    selector: 'app-edit-employee',
    templateUrl: './edit-employee.component.html',
    styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

    empleado: EmpleadoDTO;

    display: string[] = [];
    hint: string[] = [];
    edit: boolean[] = [];

    // tslint:disable-next-line:max-line-length
    constructor(private cacheService: CacheService, private restService: RestService, private notifier: NotifierService, private navigation: NavigationService) {
        this.empleado = this.cacheService.getData();

        // tslint:disable-next-line:forin
        for (const prop in this.empleado) {
            if (
                prop.toLowerCase().includes('jefe') ||
                prop.toLowerCase().includes('key') ||
                prop.toLowerCase().includes('nombrecompleto')
                ) {} else { this.display.push(prop.charAt(0).toUpperCase() + prop.substr(1)); }
        }
        if (this.cacheService.mode === 'EDIT') {
        this.edit = [true, true, false, true, false, this.empleado.jefe];
        } else {
              this.edit = [true, true, true, true, true, false];
        }
    }

    ngOnInit() {
    }

    save(empleado: EmpleadoDTO) {
        this.restService.updateEmpleado(empleado).subscribe(() => {
            this.notifier.notify('success', 'Actualizado');
            this.navigation.back();
        });
    }

}
