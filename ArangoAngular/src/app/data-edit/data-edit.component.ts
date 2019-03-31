import { Component, OnInit, Input, Output } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { NavigationService } from '../navigation.service';

@Component({
    selector: 'app-data-edit',
    templateUrl: './data-edit.component.html',
    styleUrls: ['./data-edit.component.css']
})
export class DataEditComponent implements OnInit {

    @Input()
    data = {};
    @Input()
    displayValues: string[] = [];
    @Input()
    hintValues: string[] = [];
    @Input()
    editable: boolean[] = [];

    @Output()
    saving = new EventEmitter();


    constructor(
        private navigation: NavigationService,
    ) { }

    ngOnInit() {
    }


    save() {
        this.data['id'] = this.data['key'];
        this.saving.emit(this.data);
    }

    cancel() {
        this.navigation.back();
    }

}
