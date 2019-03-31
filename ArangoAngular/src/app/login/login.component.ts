import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    usernameFormControl = new FormControl('', [
        Validators.required,
    ]);

    passFormControl = new FormControl('', [
        Validators.required,
    ]);

    matcher = new MyErrorStateMatcher();

    username: string;
    password: string;

    constructor(private restService: RestService, private router: Router, private notifier: NotifierService) { }

    ngOnInit(): void {

    }

    public onLogin() {
        this.username = this.usernameFormControl.value;
        this.password = this.passFormControl.value;

        this.restService.login(this.username, this.password).subscribe(user => {
            if (user) {
                this.restService.loggedUser = user;
                this.notifier.notify('success', 'Correcto!');
                if (user.jefe) {
                    this.router.navigate(['/empleados']);
                } else {
                    this.router.navigate(['/incidencias']);
                }
            } else {
                this.notifier.notify('error', 'Datos incorrectos');
            }
        });
    }
}


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
