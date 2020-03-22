import { Injectable } from '@angular/core';
import { Competition } from './competition.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  readonly rootURL = 'https://localhost:44327/api/Competitions/';

  list: Competition[];

  form: FormGroup = new FormGroup({
    ID: new FormControl(0),
    SportID: new FormControl(null, Validators.required),
    Name: new FormControl(null, Validators.required)
  });

  constructor(private http: HttpClient) { }

  postCompetition() {
    let body = {
      SportID: this.form.value.SportID,
      Name: this.form.value.Name
    }

    return this.http.post(this.rootURL, body);
  }

  putCompetition() {
    let competitionID = this.form.value.ID;
    let body = {
      ID: competitionID,
      SportID: this.form.value.SportID,
      Name: this.form.value.Name
    }

    return this.http.put(this.rootURL + competitionID, body);
  }

  getCompetition(id: number) {
    return this.http.get(this.rootURL + id);
  } 
  
  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.rootURL);
  }

  deleteCompetition(id: number) {
    return this.http.delete(this.rootURL + id);
  }

  // Gets all competitions for the selected sport.
  getCompetitionsBySport(sportID: number): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.rootURL + 'competitionsBySport/' + sportID);
  }

  // Gets possible competitions for the currently selected team.
  getPossibleCompetitions(teamID: number) {
    return this.http.get<Competition[]>(this.rootURL + 'possibleCompetitionsForTeam/' + teamID);
  }

  refreshList(){
    this.http.get(this.rootURL)
    .toPromise()
    .then(res => this.list = res as Competition[]);
  }

}
