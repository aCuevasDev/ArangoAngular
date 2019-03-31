import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EmpleadoDTO, IncidenciaDTO, RankingDTO } from './model/model';
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
        return this.http.get<IncidenciaDTO[]>(url).pipe(catchError(this.handleError<IncidenciaDTO[]>()));
    }

    getRanking() {
        const url = `${this.urlBase}ranking`;
        return this.http.post<RankingDTO>(url, this.loggedUser).pipe(catchError(this.handleError<RankingDTO>()));
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
