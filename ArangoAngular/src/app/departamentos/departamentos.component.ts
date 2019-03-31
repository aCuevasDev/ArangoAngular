import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent } from '../data-table/data-table.component';
import { DepartamentoDTO } from '../model/model';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { CacheService } from '../cache.service';
import { DepartamentoDTOImpl } from '../model/departamentodtoimpl';

@Component({
    selector: 'app-departamentos',
    templateUrl: './departamentos.component.html',
    styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

    @ViewChild(DataTableComponent) dataTable: DataTableComponent;
    displayColumns = ['Nombre', 'Jefe', 'edit'];
    displayNum = ['', ''];
    isLoading = true;
    departamentosObservable: Observable<DepartamentoDTO[]>;


    constructor(
        public restService: RestService,
        private router: Router,
        private notifier: NotifierService,
        private cacheService: CacheService) {
        this.departamentosObservable = this.restService.getDepartamentos();
        this.isLoading = false;
    }

    ngOnInit() {

    }

    onSelect(dept: DepartamentoDTO | null) {
        if (dept) {
            this.cacheService.cachedData = [dept];
            this.cacheService.mode = 'EDIT';
        } else {
            this.cacheService.cachedData = [new DepartamentoDTOImpl()];
            this.cacheService.mode = 'CREATE';
        }
        this.router.navigate(['/editDepartamento']);
    }

    onDelete(dept: DepartamentoDTO) {
        this.restService.deleteDepartamento(dept).subscribe(() => {
            this.dataTable.refresh(this.departamentosObservable);
            this.notifier.notify('success', 'Hecho');
        });
    }


}
