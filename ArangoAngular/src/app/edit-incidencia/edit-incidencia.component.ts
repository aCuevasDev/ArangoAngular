import { Component, OnInit } from '@angular/core';
import { IncidenciaDTO, EmpleadoDTO } from '../model/model';
import { CacheService } from '../cache.service';
import { RestService } from '../rest.service';
import { EmpladoDTOImp } from '../model/empladodtoimp';
import { NotifierService } from 'angular-notifier';

@Component({
    selector: 'app-edit-incidencia',
    templateUrl: './edit-incidencia.component.html',
    styleUrls: ['./edit-incidencia.component.css']
})
export class EditIncidenciaComponent implements OnInit {

    incidencia: IncidenciaDTO;

    display: string[] = [];
    hint: string[] = [];
    edit: boolean[] = [];

    constructor(private cacheService: CacheService, private restService: RestService, private notifier: NotifierService) {
        this.incidencia = this.cacheService.getData();

        for (const prop in this.incidencia) {
            if (
                prop.toLowerCase().includes('origen') ||
                prop.toLowerCase().includes('fechafin') ||
                prop.toLowerCase().includes('fechainicio') ||
                prop.toLowerCase().includes('key')
            ) { } else { this.display.push(prop.charAt(0).toUpperCase() + prop.substr(1)); }
        }

        if (this.cacheService.mode === 'EDIT') {
            this.edit = [true, true, false, false, this.restService.loggedUser.jefe];
        } else {
            this.edit = [true, true, true, true, true, false];
        }
    }

    ngOnInit() {
    }


    save(incidencia: IncidenciaDTO) {
        this.restService.createIncidencia(incidencia).subscribe(() => this.notifier.notify('success', 'Creado'));

    }
}
