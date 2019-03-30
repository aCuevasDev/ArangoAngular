import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpleadoDTO, IncidenciaDTO } from './model/model';


@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(private http: HttpClient) { }

    readonly urlBase = 'http://localhost:8080/rest/';

    getEmpleados() {
        const url = `${this.urlBase}empleado`;
        return this.http.get<EmpleadoDTO[]>(url);
    }

    getIncidencias() {
        const url = `${this.urlBase}incidencia`;
        return this.http.get<IncidenciaDTO[]>(url);
    }
}
