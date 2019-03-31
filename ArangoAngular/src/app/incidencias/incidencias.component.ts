import { Component, OnInit } from '@angular/core';
import { IncidenciaDTO } from '../model/model';
import { RestService } from '../rest.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CacheService } from '../cache.service';
import { IncidenciaDTOImp } from '../model/incidenciadtoimp';

@Component({
    selector: 'app-incidencias',
    templateUrl: './incidencias.component.html',
    styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {

    displayColumns = ['Titulo', 'Descripcion', 'Origen', 'Destino', 'FechaInicio', 'FechaFin', 'Urgente', 'solve'];
    displayNum = ['', '', '', '', '', '', ''];
    isLoading = true;
    incidenciaObservable: Observable<IncidenciaDTO[]>;

    // tslint:disable-next-line:max-line-length
    constructor(public restService: RestService, private router: Router, private notifier: NotifierService, private cacheService: CacheService) {
        this.incidenciaObservable = this.restService.getIncidencias();
        this.isLoading = false;
    }

    ngOnInit() { }

    onSelect(incidencia: IncidenciaDTO | null) {
        this.cacheService.cachedData = [new IncidenciaDTOImp(this.restService.loggedUser)];
        this.cacheService.mode = 'CREATE';
        this.router.navigate(['/editIncidencia']);
    }

    onDelete(incidencia: IncidenciaDTO) {
        incidencia.fechaFin = new Date();
        this.restService.updateIncidencia(incidencia).subscribe(() => this.notifier.notify('success', 'Guardado'));
    }
}
