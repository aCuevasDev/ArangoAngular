import { Component, OnInit, Input, ViewChild, Output, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { style, transition, animate, keyframes, state, trigger } from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('mouseState', [
            state('out', style({
                transform: 'scale(1)'
            })),
            state('in', style({
                transform: 'scale(1.15)'
            })),

        ])]
})
export class DataTableComponent implements OnInit {

    @Input()
    displayedColumns: string[];
    @Input()
    dataObservable: Observable<any>;
    @Input()
    nameLabel: string;
    @Input()
    tipoNuevo: string;
    @Input()
    isCreable = true;
    @Input()
    isBorrable = true;
    @Input()
    isEditable = true;
    @Input()
    isSolveable = true;
    @Input()
    total: any[];
    @Output()
    deleted = new EventEmitter();
    @Output()
    selected = new EventEmitter();
    dataSource: MatTableDataSource<any>;
    paginator: MatPaginator;
    sort: MatSort;
    @ViewChild(MatPaginator) set matPaginator(matpag: MatPaginator) {
        this.paginator = matpag;
        this.setDataSourceAttributes();
    }
    @ViewChild(MatSort) set matSort(matSort: MatSort) {
        this.sort = matSort;
        this.setDataSourceAttributes();
    }
    rowNumber = 5;
    isLoading: boolean;
    mouseState: ('out' | 'in')[][] = [];
    constructor(
        private restService: RestService,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private router: Router,
        private changeDet: ChangeDetectorRef) {
        this.dataSource = new MatTableDataSource();
    }

    // tslint:disable-next-line:max-line-length
    // Did this workarround to solve ngOnInit being called before the *ngIf directive in the html, therefore sort and paginator being undefined.
    // https://github.com/angular/material2/issues/10205
    setDataSourceAttributes() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnInit() {
        this.initAnimations();
        this.load();
    }

    load() {
        this.dataObservable.subscribe(data => {
            this.dataSource.data = data;
            this.isLoading = false;
        });
    }

    initAnimations() {
        this.mouseState[0] = [];
        this.mouseState[1] = [];
        this.mouseState[2] = [];
        for (let index = 0; index < this.rowNumber; index++) {
            this.mouseState[0][index] = 'out';
            this.mouseState[1][index] = 'out';
        }
        this.mouseState[2][0] = 'out';
    }

    delete(data: any) {
        console.log('delete');
        this.deleted.emit(data);
    }

    toggleMouseState(buttonIndex: number, index: number) {
        this.mouseState[buttonIndex][index] = this.mouseState[buttonIndex][index] === 'out' ? 'in' : 'out';
    }

    edit(data: any | null) {
        console.log('create or edit');
        this.selected.emit(data);
    }

    public refresh(observable: Observable<any>) {
        this.dataObservable = observable;
        this.load();
        this.changeDet.markForCheck();
    }

    askDelete(event: MouseEvent, data: any) {
        // console.log("openConfirmationDialog");

        const message = 'De verdad quieres borrar a: ' + data[this.nameLabel];
        const accept = () => this.delete(data);

        this.confirmationService.confirm({
            // tslint:disable-next-line:object-literal-shorthand
            message: message,
            // tslint:disable-next-line:object-literal-shorthand
            accept: accept
        });

        event.stopPropagation();
    }

    askSolve(event: MouseEvent, data: any, index: number) {
        // console.log("openConfirmationDialog");
        data['id'] = this.dataSource.data[index]['key'];
        const message = 'Estás seguro?';
        const accept = () => this.delete(data);

        this.confirmationService.confirm({
            // tslint:disable-next-line:object-literal-shorthand
            message: message,
            // tslint:disable-next-line:object-literal-shorthand
            accept: accept
        });

        event.stopPropagation();
    }

}
