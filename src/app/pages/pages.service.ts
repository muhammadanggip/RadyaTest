import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn : 'root'
})
export class PagesService {

    constructor(private http: HttpClient) { }

    url = 'https://api.openweathermap.org/data/2.5/';
    key = '4052eb52fa98f267284a208f6875c8fc';
    city = 'Bandung';
    callback= 'Weather'

    getCurrentWheather() {
        return this.http.get(this.url+'weather?q='+this.city+'&callback='+this.callback+'&appid='+this.key);
    }

  


}


