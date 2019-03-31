import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EmpleadoDTO, IncidenciaDTO, RankingDTO, DepartamentoDTO } from './model/model';
import { catchError, map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(private http: HttpClient, private notifier: NotifierService) { }

    readonly urlBase = 'http://localhost:8080/rest/';
    loggedUser: EmpleadoDTO;

    private handleError<T>(msg: string = 'Server error', result?: T) {
        return (error: HttpErrorResponse): Observable<T> => {
            this.notifier.notify('error', msg);
            return of(result as T);
        };
    }


    login(username: string, password: string) {
        const url = `${this.urlBase}login`;
        // tslint:disable-next-line:object-literal-shorthand
        const user = { username: username, contrasenya: password };
        return this.http.post<EmpleadoDTO>(url, user, { headers: this.createHeaders() }).pipe(catchError(this.handleError<EmpleadoDTO>()));
    }

    getEmpleados() {
        const url = `${this.urlBase}empleado`;
        return this.http.post<EmpleadoDTO[]>(url, this.loggedUser).pipe(catchError(this.handleError<EmpleadoDTO[]>()));
    }

    createEmpleado(empleado: EmpleadoDTO) {
        const url = `${this.urlBase}empleado/create`;
        return this.http.post<EmpleadoDTO>(url, [this.loggedUser, empleado]).pipe(catchError(this.handleError<EmpleadoDTO>()));
    }

    updateEmpleado(empleado: EmpleadoDTO) {
        const url = `${this.urlBase}empleado/update`;
        // tslint:disable-next-line:max-line-length
        return this.http.post<EmpleadoDTO>(url, [this.loggedUser, empleado]).pipe(catchError(this.handleError<EmpleadoDTO>()));
    }

    deleteEmpleado(empleado: EmpleadoDTO) {
        const url = `${this.urlBase}empleado/delete`;
        return this.http.post(url, [this.loggedUser, empleado]).pipe(catchError(this.handleError()));
    }

    getIncidencias() {
        const url = `${this.urlBase}incidencia`;
        return this.http.post<IncidenciaDTO[]>(url, this.loggedUser).pipe(catchError(this.handleError<IncidenciaDTO[]>()));
    }
    // TODO THIS DOESN'T WORK, BACKEND NOT ABLE TO READ THIS BODY
    createIncidencia(incidencia: IncidenciaDTO) {
        const url = `${this.urlBase}empleado/create`;
        // tslint:disable-next-line:max-line-length
        return this.http.post<IncidenciaDTO>(url, { user: this.loggedUser, incidencia }).pipe(catchError(this.handleError<IncidenciaDTO>()));
    }

    updateIncidencia(incidencia: IncidenciaDTO) {
        const url = `${this.urlBase}incidencia/update`;
        return this.http.post<IncidenciaDTO[]>(url, incidencia).pipe(catchError(this.handleError<IncidenciaDTO[]>()));
    }

    getRanking() {
        const url = `${this.urlBase}ranking`;
        return this.http.post<RankingDTO>(url, this.loggedUser).pipe(catchError(this.handleError<RankingDTO>()));
    }

    getDepartamentos() {
        const url = `${this.urlBase}departamento`;
        return this.http.post<DepartamentoDTO[]>(url, this.loggedUser).pipe(catchError(this.handleError<DepartamentoDTO[]>()));
    }

    createDepartamento(dept: DepartamentoDTO) {
        const url = `${this.urlBase}departamento/create`;
        return this.http.post<DepartamentoDTO>(url, { user: this.loggedUser, dept}).pipe(catchError(this.handleError<DepartamentoDTO>()));
    }

    updateDepartamento(dept: DepartamentoDTO) {
        const url = `${this.urlBase}departamento/update`;
        // tslint:disable-next-line:max-line-length
        return this.http.post<DepartamentoDTO>(url, { user: this.loggedUser, dept}).pipe(catchError(this.handleError<DepartamentoDTO>()));
    }

    // private addUser() {
    //     this.headers.append('Content-Type', 'application/json');
    //     this.params.append('user', JSON.stringify(this.loggedUser));
    // }

    private createHeaders() {
        return new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }
}
