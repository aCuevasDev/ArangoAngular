import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { ConfirmationService } from 'primeng/primeng';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

    @Input()
    displayedColumns: string[];
    @Input()
    data: any[];
    @Input()
    nameLabel: string;
    // tslint:disable-next-line:no-output-on-prefix
    @Output()
    onDelete = new EventEmitter();
    // tslint:disable-next-line:no-output-on-prefix
    @Output()
    onSelect = new EventEmitter();
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
    isLoading = false;
    mouseState: ('out' | 'in')[][] = [];
    constructor(
        private restService: RestService,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private router: Router) {
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
        this.route.paramMap.subscribe(() => this.load());
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

    load() {
        // TODO THIS
        this.isLoading = true;
        // tslint:disable-next-line:max-line-length
        // this.restService.getPersons(this.personType).subscribe(persons => { this.personsDataSource.data = persons; this.isLoading = false; });
    }


    delete(data: any) {
        console.log('delete');
        this.onDelete.emit(data);
    }

    toggleMouseState(buttonIndex: number, index: number) {
        this.mouseState[buttonIndex][index] = this.mouseState[buttonIndex][index] === 'out' ? 'in' : 'out';
    }

    edit(data: any | null) {
        this.onSelect.emit(data);
    }

    askDelete(event: MouseEvent, data: any) {
        // console.log("openConfirmationDialog");

        const message = 'Do you really want to erase: ' + data[this.nameLabel];
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
