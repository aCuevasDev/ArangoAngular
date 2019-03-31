import { Component, OnInit } from '@angular/core';
import { RankingDTO } from '../model/model';
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';

@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

    rankingObservable: Observable<RankingDTO>;
    constructor(private restService: RestService) {
        this.rankingObservable = this.restService.getRanking();
    }

    ngOnInit() {
    }

}
