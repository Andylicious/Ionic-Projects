import {Http} from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
  
export class EdmService {  
  dat:any
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http) {

    }

    searchEdm(url) {
    console.log("Creating response..")
 var response = this.http.get('https://crossorigin.me/'+url).map(res => res.text());
    console.log("Returning response..")
    return response
}

logError(err) {
  console.error('There was an error: ' + err);
}

}