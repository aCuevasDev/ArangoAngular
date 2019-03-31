import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { CacheService } from '../cache.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public restService: RestService, private cacheService: CacheService) { }

  ngOnInit() {
  }

  prepararCache() {
    this.cacheService.cachedData = [this.restService.loggedUser];
    this.cacheService.mode = 'EDIT';
  }

}
