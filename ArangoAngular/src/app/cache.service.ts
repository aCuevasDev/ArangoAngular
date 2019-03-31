import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    cachedData: any[] = [];
    mode: Mode;

    constructor() { }

    getData() {
        if (this.cachedData) {
            if (this.cachedData.length > 1) {
                return this.cachedData;
            } else { return this.cachedData[0]; }
        }
        this.clearData();
    }

    clearData() {
        this.cachedData = [];
    }

    clearMode() {
        this.mode = null;
    }

    clearAll() {
        this.clearData();
        this.clearMode();
    }
}
type Mode = 'CREATE' | 'EDIT' | 'DELETE' | null;
