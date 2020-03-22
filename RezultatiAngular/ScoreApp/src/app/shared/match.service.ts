import { Injectable } from '@angular/core';
import { Match } from './match.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  // API root match URL.
  readonly rootURL = 'https://localhost:44327/api/Matches/';

  // Match list.
  list: Match[];

  constructor(private http: HttpClient) { }

  // Form used for match insert / update.
  form: FormGroup = new FormGroup({
    ID: new FormControl(0),
    Date: new FormControl('', Validators.required),
    Time: new FormControl('', Validators.required),
    SportID: new FormControl(null, Validators.required),
    CompetitionID: new FormControl(null, Validators.required),
    HomeTeamID: new FormControl(null, Validators.required),
    AwayTeamID: new FormControl(null, Validators.required),
    HomeTeamScore: new FormControl(null),
    AwayTeamScore: new FormControl(null),
    HalfTimeHomeTeamScore: new FormControl(null),
    HalfTimeAwayTeamScore: new FormControl(null)
  });

  // Body construction method for match insert.
  postMatch() {
    let time = String(this.form.value.Time);
    let date = new Date(this.form.value.Date);

    // e.g. 12:30
    // 12
    date.setHours(Number(time.substring(0, 2)));
    // 30
    date.setMinutes(Number(time.substring(3)));
    // Transforming to ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).
    let finalDate = date.toISOString();

    // HTTP request body.
    var body = {
      Date: finalDate,
      SportID: this.form.value.SportID,
      CompetitionID: this.form.value.CompetitionID,
      HomeTeamID: this.form.value.HomeTeamID,
      AwayTeamID: this.form.value.AwayTeamID,
      HomeTeamScore: this.form.value.HomeTeamScore,
      AwayTeamScore: this.form.value.AwayTeamScore,
      HalfTimeHomeTeamScore: this.form.value.HalfTimeHomeTeamScore,
      HalfTimeAwayTeamScore: this.form.value.HalfTimeAwayTeamScore
    };

    // Calling API method for match inserting.
    return this.http.post(this.rootURL, body);
  }

  // Body construction method for match update.
  putMatch() {
    let matchID = this.form.value.ID;
    let time = String(this.form.value.Time);
    let date = new Date(this.form.value.Date);

    date.setHours(Number(time.substring(0, 2)));
    date.setMinutes(Number(time.substring(3)));

    // HTTP request body.
    var body = {
      ID: matchID,
      Date: date,
      SportID: this.form.value.SportID,
      CompetitionID: this.form.value.CompetitionID,
      HomeTeamID: this.form.value.HomeTeamID,
      AwayTeamID: this.form.value.AwayTeamID,
      HomeTeamScore: this.form.value.HomeTeamScore,
      AwayTeamScore: this.form.value.AwayTeamScore,
      HalfTimeHomeTeamScore: this.form.value.HalfTimeHomeTeamScore,
      HalfTimeAwayTeamScore: this.form.value.HalfTimeAwayTeamScore
    };

    // Calling API method for match updating.
    return this.http.put(this.rootURL + matchID, body);
  }

  // Calling API method to retrieve a match with specified ID.
  // id - match ID.
  getMatch(id: number) {
    return this.http.get(this.rootURL + id);
  }

  // Calling API method to retrieve all matches.
  getMatches() {
    return this.http.get(this.rootURL);
  }

  // Calling API method to retrieve today's matches.
  getTodaysMatches() {
    return this.http.get<Match[]>(this.rootURL + 'today');
  }

  // Calling API method to retrieve matches on specific date.
  // dateDifference - difference in days compared to today.
  getMatchesByDateDifference(dateDifference) {
    return this.http.get<Match[]>(this.rootURL + 'byDateDifference/' + dateDifference);
  }

  // Calling API method to delete a match with specified ID.
  // id - match ID.
  deleteMatch(id: number) {
    return this.http.delete(this.rootURL + id);
  }

  // Calling API method to retrieve matches of specific sport.
  // sportId - sport ID.
  getMatchesBySport(sportId: number) {
    return this.http.get(this.rootURL + 'bySport/' + sportId);
  }

  // Refresh match list.
  refreshList() {
    this.http.get(this.rootURL)
      .toPromise()
      .then(res => this.list = res as Match[]);
  }
}
