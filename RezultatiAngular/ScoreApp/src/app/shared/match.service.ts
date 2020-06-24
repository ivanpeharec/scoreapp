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
  matchForm: FormGroup = new FormGroup({
    ID: new FormControl(0),
    Date: new FormControl('', Validators.required),
    Time: new FormControl('', Validators.required),
    SportID: new FormControl(null, Validators.required),
    CompetitionID: new FormControl(null, Validators.required),
    HomeTeamID: new FormControl(null, Validators.required),
    AwayTeamID: new FormControl(null, Validators.required)
  });

  // Form used for football match components insert / update.
  footballMatchComponentsForm: FormGroup = new FormGroup({
    MatchID: new FormControl(0),
    HomeTeamScore: new FormControl(null),
    AwayTeamScore: new FormControl(null),
    HalfTimeHomeTeamScore: new FormControl(null),
    HalfTimeAwayTeamScore: new FormControl(null)
  });

  // Form used for basketball match components insert / update.
  basketballMatchComponentsForm: FormGroup = new FormGroup({
    MatchID: new FormControl(0),
    FirstQuarterHomeTeamScore: new FormControl(null),
    FirstQuarterAwayTeamScore: new FormControl(null),
    SecondQuarterHomeTeamScore: new FormControl(null),
    SecondQuarterAwayTeamScore: new FormControl(null),
    ThirdQuarterHomeTeamScore: new FormControl(null),
    ThirdQuarterAwayTeamScore: new FormControl(null),
    FourthQuarterHomeTeamScore: new FormControl(null),
    FourthQuarterAwayTeamScore: new FormControl(null)
  });

  // Form used for ice hockey match components insert / update.
  iceHockeyMatchComponentsForm: FormGroup = new FormGroup({
    MatchID: new FormControl(0),
    FirstPeriodHomeTeamScore: new FormControl(null),
    FirstPeriodAwayTeamScore: new FormControl(null),
    SecondPeriodHomeTeamScore: new FormControl(null),
    SecondPeriodAwayTeamScore: new FormControl(null),
    ThirdPeriodHomeTeamScore: new FormControl(null),
    ThirdPeriodAwayTeamScore: new FormControl(null),
  });

  // Body construction method for match insert.
  postMatch() {
    let time = String(this.matchForm.value.Time);
    let date = new Date(this.matchForm.value.Date);

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
      SportID: this.matchForm.value.SportID,
      CompetitionID: this.matchForm.value.CompetitionID,
      HomeTeamID: this.matchForm.value.HomeTeamID,
      AwayTeamID: this.matchForm.value.AwayTeamID,
      HomeTeamScore: this.matchForm.value.HomeTeamScore,
      AwayTeamScore: this.matchForm.value.AwayTeamScore,
      HalfTimeHomeTeamScore: this.matchForm.value.HalfTimeHomeTeamScore,
      HalfTimeAwayTeamScore: this.matchForm.value.HalfTimeAwayTeamScore
    };

    // Calling API method for match inserting.
    return this.http.post(this.rootURL, body);
  }

  postMatchDetails(matchID: number) {
    var matchComponents = {};

    if (this.matchForm.value.SportID == 1) {
      matchComponents = {
        MatchID: matchID,
        HomeTeamScore: this.footballMatchComponentsForm.value.HomeTeamScore,
        AwayTeamScore: this.footballMatchComponentsForm.value.AwayTeamScore,
        HalfTimeHomeTeamScore: this.footballMatchComponentsForm.value.HalfTimeHomeTeamScore,
        HalfTimeAwayTeamScore: this.footballMatchComponentsForm.value.HalfTimeAwayTeamScore
      };

      // Calling API method for football match components inserting.
      return this.http.post(this.rootURL + 'footballMatchDetails', matchComponents);
    }
    else if (this.matchForm.value.SportID == 2) {
      matchComponents = {
        MatchID: matchID,
        FirstQuarterHomeTeamScore: this.basketballMatchComponentsForm.value.FirstQuarterHomeTeamScore,
        FirstQuarterAwayTeamScore: this.basketballMatchComponentsForm.value.FirstQuarterAwayTeamScore,
        SecondQuarterHomeTeamScore: this.basketballMatchComponentsForm.value.SecondQuarterHomeTeamScore,
        SecondQuarterAwayTeamScore: this.basketballMatchComponentsForm.value.SecondQuarterAwayTeamScore,
        ThirdQuarterHomeTeamScore: this.basketballMatchComponentsForm.value.ThirdQuarterHomeTeamScore,
        ThirdQuarterAwayTeamScore: this.basketballMatchComponentsForm.value.ThirdQuarterAwayTeamScore,
        FourthQuarterHomeTeamScore: this.basketballMatchComponentsForm.value.FourthQuarterHomeTeamScore,
        FourthQuarterAwayTeamScore: this.basketballMatchComponentsForm.value.FourthQuarterAwayTeamScore
      };

      // Calling API method for basketball match components inserting.
      return this.http.post(this.rootURL + 'basketballMatchDetails', matchComponents);
    }
    else {
      matchComponents = {
        MatchID: matchID,
        FirstPeriodHomeTeamScore: this.iceHockeyMatchComponentsForm.value.FirstPeriodHomeTeamScore,
        FirstPeriodAwayTeamScore: this.iceHockeyMatchComponentsForm.value.FirstPeriodAwayTeamScore,
        SecondPeriodHomeTeamScore: this.iceHockeyMatchComponentsForm.value.SecondPeriodHomeTeamScore,
        SecondPeriodAwayTeamScore: this.iceHockeyMatchComponentsForm.value.SecondPeriodAwayTeamScore,
        ThirdPeriodHomeTeamScore: this.iceHockeyMatchComponentsForm.value.ThirdPeriodHomeTeamScore,
        ThirdPeriodAwayTeamScore: this.iceHockeyMatchComponentsForm.value.ThirdPeriodAwayTeamScore
      };

      // Calling API method for ice hockey match components inserting.
      return this.http.post(this.rootURL + 'iceHockeyMatchDetails', matchComponents);
    }
  }


  // Body construction method for match update.
  putMatch() {
    let matchID = this.matchForm.value.ID;
    let time = String(this.matchForm.value.Time);
    let date = new Date(this.matchForm.value.Date);

    date.setHours(Number(time.substring(0, 2)));
    date.setMinutes(Number(time.substring(3)));

    // HTTP request body.
    var body = {
      ID: matchID,
      Date: date,
      SportID: this.matchForm.value.SportID,
      CompetitionID: this.matchForm.value.CompetitionID,
      HomeTeamID: this.matchForm.value.HomeTeamID,
      AwayTeamID: this.matchForm.value.AwayTeamID
    };

    // Calling API method for match updating.
    return this.http.put(this.rootURL + matchID, body);
  }

  putMatchDetails(matchID: number) {
    var matchComponents = {};

    if (this.matchForm.value.SportID == 1) {
      matchComponents = {
        MatchID: matchID,
        HomeTeamScore: this.footballMatchComponentsForm.value.HomeTeamScore,
        AwayTeamScore: this.footballMatchComponentsForm.value.AwayTeamScore,
        HalfTimeHomeTeamScore: this.footballMatchComponentsForm.value.HalfTimeHomeTeamScore,
        HalfTimeAwayTeamScore: this.footballMatchComponentsForm.value.HalfTimeAwayTeamScore
      };

      // Calling API method for football match components updating.
      return this.http.put(this.rootURL + 'footballMatchDetails/' + matchID, matchComponents);
    }
    else if (this.matchForm.value.SportID == 2) {
      matchComponents = {
        MatchID: matchID,
        FirstQuarterHomeTeamScore: this.basketballMatchComponentsForm.value.FirstQuarterHomeTeamScore,
        FirstQuarterAwayTeamScore: this.basketballMatchComponentsForm.value.FirstQuarterAwayTeamScore,
        SecondQuarterHomeTeamScore: this.basketballMatchComponentsForm.value.SecondQuarterHomeTeamScore,
        SecondQuarterAwayTeamScore: this.basketballMatchComponentsForm.value.SecondQuarterAwayTeamScore,
        ThirdQuarterHomeTeamScore: this.basketballMatchComponentsForm.value.ThirdQuarterHomeTeamScore,
        ThirdQuarterAwayTeamScore: this.basketballMatchComponentsForm.value.ThirdQuarterAwayTeamScore,
        FourthQuarterHomeTeamScore: this.basketballMatchComponentsForm.value.FourthQuarterHomeTeamScore,
        FourthQuarterAwayTeamScore: this.basketballMatchComponentsForm.value.FourthQuarterAwayTeamScore
      };

      // Calling API method for basketball match components updating.
      return this.http.put(this.rootURL + 'basketballMatchDetails/' + matchID, matchComponents);
    }
    else {
      matchComponents = {
        MatchID: matchID,
        FirstPeriodHomeTeamScore: this.iceHockeyMatchComponentsForm.value.FirstPeriodHomeTeamScore,
        FirstPeriodAwayTeamScore: this.iceHockeyMatchComponentsForm.value.FirstPeriodAwayTeamScore,
        SecondPeriodHomeTeamScore: this.iceHockeyMatchComponentsForm.value.SecondPeriodHomeTeamScore,
        SecondPeriodAwayTeamScore: this.iceHockeyMatchComponentsForm.value.SecondPeriodAwayTeamScore,
        ThirdPeriodHomeTeamScore: this.iceHockeyMatchComponentsForm.value.ThirdPeriodHomeTeamScore,
        ThirdPeriodAwayTeamScore: this.iceHockeyMatchComponentsForm.value.ThirdPeriodAwayTeamScore
      };

      // Calling API method for ice hockey match components updating.
      return this.http.put(this.rootURL + 'iceHockeyMatchDetails/' + matchID, matchComponents);
    }
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

  // Calling API method to retrieve matches on specific date for a particular sport.
  // dateDifference - difference in days compared to today.
  // sportID - sport ID.
  getMatchesBySportByDateDifference(sportID, dateDifference) {
    return this.http.get<Match[]>(this.rootURL + 'bySportByDateDifference/' + sportID + '/' + dateDifference);
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

  // Get the day of the week abbreviation.
  dayOfWeek(dayNumber) {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayNumber];
  }
}
