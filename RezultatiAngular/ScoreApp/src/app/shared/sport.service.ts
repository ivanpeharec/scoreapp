import { Injectable } from '@angular/core';
import { Sport } from './sport.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SportService {
  readonly rootURL = 'https://localhost:44327/api/Sports/';
  list: Sport[];

  form: FormGroup = new FormGroup({
    ID: new FormControl(0),
    Name: new FormControl(null, Validators.required)
  });

  constructor(private http: HttpClient) { }

  getSport(id: number) {
    return this.http.get(this.rootURL + id);
  } 

  // Gets the sport ID of specific match.
  getSportByMatchID(matchID: number) {
    return this.http.get(this.rootURL + 'byMatchID/' + matchID);
  } 
  
  getSports() {
    return this.http.get<Sport[]>(this.rootURL);
  }

  postSport() {
    let body = {
      Name: this.form.value.Name
    }

    return this.http.post(this.rootURL, body);
  }

  putSport() {
    let sportID = this.form.value.ID;
    let body = {
      ID: sportID,
      Name: this.form.value.Name
    }

    return this.http.put(this.rootURL + sportID, body);
  }

  deleteSport(id: number) {
    return this.http.delete(this.rootURL + id);
  }

  refreshList(){
    this.http.get(this.rootURL)
    .toPromise()
    .then(res => this.list = res as Sport[]);
  }
}
