import { Component, OnInit } from '@angular/core';
import { DepartamentoDTO } from '../model/model';
import { CacheService } from '../cache.service';
import { RestService } from '../rest.service';
import { NotifierService } from 'angular-notifier';
import { NavigationService } from '../navigation.service';

@Component({
    selector: 'app-edit-departamentos',
    templateUrl: './edit-departamentos.component.html',
    styleUrls: ['./edit-departamentos.component.css']
})
export class EditDepartamentosComponent implements OnInit {

    departamento: DepartamentoDTO;

    display: string[] = [];
    hint: string[] = [];
    edit: boolean[] = [];

    // tslint:disable-next-line:max-line-length
    constructor(private cacheService: CacheService, private restService: RestService, private notifier: NotifierService, private navigation: NavigationService) {
        this.departamento = this.cacheService.getData();

        // tslint:disable-next-line:forin
        for (const prop in this.departamento) {
            if (prop.toLowerCase().includes('key')) { } else { this.display.push(prop.charAt(0).toUpperCase() + prop.substr(1)); }
        }
        if (this.cacheService.mode === 'EDIT') {
            this.edit = [true, this.restService.loggedUser.jefe];
        } else {
            this.edit = [true, true];
        }
    }

    ngOnInit() {
    }

    save(departamento: DepartamentoDTO) {
        this.restService.updateDepartamento(departamento).subscribe(() => {
            if (this.cacheService.mode === 'EDIT') {
                this.notifier.notify('success', 'Actualizado');
            } else { this.notifier.notify('success', 'Creado'); }
            this.navigation.back();
        });
    }

}
