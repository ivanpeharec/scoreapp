import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from 'src/app/shared/match.service';
import { SportService } from 'src/app/shared/sport.service';
import { ToastrService } from 'ngx-toastr';
import { Sport } from 'src/app/shared/sport.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from 'src/app/shared/match.model';
import { Competition } from 'src/app/shared/competition.model';
import { CompetitionService } from 'src/app/shared/competition.service';
import { TeamService } from 'src/app/shared/team.service';
import { Team } from 'src/app/shared/team.model';
import { concatMap } from 'rxjs/operators';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  match = {
    ID: 0,
    Date: new Date(),
    SportID: 0,
    CompetitionID: 0,
    HomeTeamID: 0,
    AwayTeamID: 0,
    FootballMatchComponents: {
      MatchID: 0,
      HalfTimeHomeTeamScore: null,
      HalfTimeAwayTeamScore: null,
      HomeTeamScore: null,
      AwayTeamScore: null
    },
    BasketballMatchComponents: {
      MatchID: 0,
      FirstQuarterHomeTeamScore: null,
      FirstQuarterAwayTeamScore: null,
      SecondQuarterHomeTeamScore: null,
      SecondQuarterAwayTeamScore: null,
      ThirdQuarterHomeTeamScore: null,
      ThirdQuarterAwayTeamScore: null,
      FourthQuarterHomeTeamScore: null,
      FourthQuarterAwayTeamScore: null
    },
    IceHockeyMatchComponents: {
      MatchID: 0,
      FirstPeriodHomeTeamScore: null,
      FirstPeriodAwayTeamScore: null,
      SecondPeriodHomeTeamScore: null,
      SecondPeriodAwayTeamScore: null,
      ThirdPeriodHomeTeamScore: null,
      ThirdPeriodAwayTeamScore: null
    }
  };

  sports: Sport[];
  competitions: Competition[];
  teams: Team[];

  // Time static values.
  timeList: string[] = [
    '00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55',
    '01:00', '01:05', '01:10', '01:15', '01:20', '01:25', '01:30', '01:35', '01:40', '01:45', '01:50', '01:55',
    '02:00', '02:05', '02:10', '02:15', '02:20', '02:25', '02:30', '02:35', '02:40', '02:45', '02:50', '02:55',
    '03:00', '03:05', '03:10', '03:15', '03:20', '03:25', '03:30', '03:35', '03:40', '03:45', '03:50', '03:55',
    '04:00', '04:05', '04:10', '04:15', '04:20', '04:25', '04:30', '04:35', '04:40', '04:45', '04:50', '04:55',
    '05:00', '05:05', '05:10', '05:15', '05:20', '05:25', '05:30', '05:35', '05:40', '05:45', '05:50', '05:55',
    '06:00', '06:05', '06:10', '06:15', '06:20', '06:25', '06:30', '06:35', '06:40', '06:45', '06:50', '06:55',
    '07:00', '07:05', '07:10', '07:15', '07:20', '07:25', '07:30', '07:35', '07:40', '07:45', '07:50', '07:55',
    '08:00', '08:05', '08:10', '08:15', '08:20', '08:25', '08:30', '08:35', '08:40', '08:45', '08:50', '08:55',
    '09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55',
    '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55',
    '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55',
    '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55',
    '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55',
    '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55',
    '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55',
    '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55',
    '17:00', '12:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55',
    '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55',
    '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55',
    '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55',
    '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55',
    '22:00', '22:05', '22:10', '22:15', '22:20', '22:25', '22:30', '22:35', '22:40', '22:45', '22:50', '22:55',
    '23:00', '23:05', '23:10', '23:15', '23:20', '23:25', '23:30', '23:35', '23:40', '23:45', '23:50', '23:55'];

  @ViewChild('stepper') stepper: MatStepper;
  constructor(public service: MatchService,
    private sportService: SportService,
    private competitionService: CompetitionService,
    private teamService: TeamService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.resetMatchObject();
    this.service.matchForm.reset();
    this.service.footballMatchComponentsForm.reset();
    this.service.basketballMatchComponentsForm.reset();
    this.service.iceHockeyMatchComponentsForm.reset();

    this.route.params
      .subscribe(
        p => {
          this.match.ID = +p['id'];
        },
        err => {
          if (err.status == 404)
            this.router.navigate(['/matches/all']);
        });

    if (this.match.ID > 0) {
      this.service.getMatch(this.match.ID)
        .subscribe(
          res => {
            this.match = res as Match;

            this.service.matchForm.patchValue({
              ID: this.match.ID,
              Date: this.match.Date,
              Time: new Date(this.match.Date).toTimeString().substring(0, 5),
              SportID: this.match.SportID,
              CompetitionID: this.match.CompetitionID,
              HomeTeamID: this.match.HomeTeamID,
              AwayTeamID: this.match.AwayTeamID
            });

            switch (this.match.SportID) {
              case 1: {
                this.service.footballMatchComponentsForm.patchValue({
                  MatchID: this.match.FootballMatchComponents?.MatchID,
                  HalfTimeHomeTeamScore: this.match.FootballMatchComponents?.HalfTimeHomeTeamScore,
                  HalfTimeAwayTeamScore: this.match.FootballMatchComponents?.HalfTimeAwayTeamScore,
                  HomeTeamScore: this.match.FootballMatchComponents?.HomeTeamScore,
                  AwayTeamScore: this.match.FootballMatchComponents?.AwayTeamScore
                });

                break;
              }
              case 2: {
                this.service.basketballMatchComponentsForm.patchValue({
                  MatchID: this.match.BasketballMatchComponents?.MatchID,
                  FirstQuarterHomeTeamScore: this.match.BasketballMatchComponents?.FirstQuarterHomeTeamScore,
                  FirstQuarterAwayTeamScore: this.match.BasketballMatchComponents?.FirstQuarterAwayTeamScore,
                  SecondQuarterHomeTeamScore: this.match.BasketballMatchComponents?.SecondQuarterHomeTeamScore,
                  SecondQuarterAwayTeamScore: this.match.BasketballMatchComponents?.SecondQuarterAwayTeamScore,
                  ThirdQuarterHomeTeamScore: this.match.BasketballMatchComponents?.ThirdQuarterHomeTeamScore,
                  ThirdQuarterAwayTeamScore: this.match.BasketballMatchComponents?.ThirdQuarterAwayTeamScore,
                  FourthQuarterHomeTeamScore: this.match.BasketballMatchComponents?.FourthQuarterHomeTeamScore,
                  FourthQuarterAwayTeamScore: this.match.BasketballMatchComponents?.FourthQuarterAwayTeamScore
                });

                break;
              }
              case 5: {
                this.service.iceHockeyMatchComponentsForm.patchValue({
                  MatchID: this.match.IceHockeyMatchComponents?.MatchID,
                  FirstPeriodHomeTeamScore: this.match.IceHockeyMatchComponents?.FirstPeriodHomeTeamScore,
                  FirstPeriodAwayTeamScore: this.match.IceHockeyMatchComponents?.FirstPeriodAwayTeamScore,
                  SecondPeriodHomeTeamScore: this.match.IceHockeyMatchComponents?.SecondPeriodHomeTeamScore,
                  SecondPeriodAwayTeamScore: this.match.IceHockeyMatchComponents?.SecondPeriodAwayTeamScore,
                  ThirdPeriodHomeTeamScore: this.match.IceHockeyMatchComponents?.ThirdPeriodHomeTeamScore,
                  ThirdPeriodAwayTeamScore: this.match.IceHockeyMatchComponents?.ThirdPeriodAwayTeamScore
                });

                break;
              }
            }
          });
    }
    else {
      this.resetMatchObject();
    }

    // Retrieving all sports.
    this.sportService.getSports()
      .subscribe(
        res => {
          this.sports = res;
        });

    // Listen to sport control being changed and reload possible competitions.
    this.service.matchForm.get("SportID").valueChanges
      .subscribe(
        res => {
          this.onSelectSport();
        });

    // Listen to competition control being changed and reload possible teams.
    this.service.matchForm.get("CompetitionID").valueChanges
      .subscribe(
        res => {
          this.onSelectCompetition();
        });
  }

  resetMatchObject() {
    this.match = {
      ID: 0,
      Date: new Date(),
      SportID: 0,
      CompetitionID: 0,
      HomeTeamID: 0,
      AwayTeamID: 0,
      FootballMatchComponents: null,
      BasketballMatchComponents: null,
      IceHockeyMatchComponents: null
    };
  }

  submitForms() {
    if (this.match.ID == 0) {
      this.insertRecord();
    }
    else {
      this.updateRecord();
    }
  }

  insertRecord() {
    this.service.postMatch().pipe(
      concatMap(
        match => {
          this.stepper.selectedIndex = 0;
          let currentMatch = match as Match;
          return this.service.postMatchDetails(currentMatch.ID);
        }
      )
    ).subscribe(
      res => {
        this.toastr.success('Match inserted successfully');
        this.stepper.reset();
      },
      err => {
        this.toastr.error('There was an error while inserting the match.');
        console.log(err);
      }
    );
  }

  updateRecord() {
    this.service.putMatch().pipe(
      concatMap(
        res => {
          return this.submitMatchDetails();
        }
      )
    ).subscribe(
      res => {
        this.toastr.success('Match updated successfully');
        this.stepper.reset();
        this.router.navigate(['/matches/all']);
      },
      err => {
        this.toastr.error('There was an error while updating the match.');
        console.log(err);
      }
    );
  }

  submitMatchDetails() {
    if (this.service.matchForm.value.SportID == 1 && this.service.footballMatchComponentsForm.value.MatchID > 0
        || this.service.matchForm.value.SportID == 2 && this.service.basketballMatchComponentsForm.value.MatchID > 0
        || this.service.matchForm.value.SportID == 5 && this.service.iceHockeyMatchComponentsForm.value.MatchID > 0) {
      return this.service.putMatchDetails(this.match.ID);
    }
    else {
      return this.service.postMatchDetails(this.match.ID);
    }
  }

  // On every change of selected sport, this method filters available competitions for the selected sport. 
  onSelectSport() {
    // Resetting form controls and arrays.
    this.service.matchForm.get('CompetitionID').reset();
    this.service.matchForm.get('HomeTeamID').reset();
    this.service.matchForm.get('AwayTeamID').reset();
    this.competitions = [];
    this.teams = [];

    this.service.footballMatchComponentsForm.reset();
    this.service.basketballMatchComponentsForm.reset();
    this.service.iceHockeyMatchComponentsForm.reset();

    if (this.service.matchForm.get("SportID").value) {
      this.competitionService
        .getCompetitionsBySport(this.service.matchForm.get("SportID").value)
        .subscribe(
          res => {
            this.competitions = res;
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  // On every change of selected competition, this method filters available teams for the selected competition. 
  onSelectCompetition() {
    // Reset form controls and arrays.
    this.service.matchForm.get('HomeTeamID').reset();
    this.service.matchForm.get('AwayTeamID').reset();
    this.teams = [];

    if (this.service.matchForm.get("CompetitionID").value) {
      this.teamService
        .getTeamsByCompetition(this.service.matchForm.get("CompetitionID").value)
        .subscribe(
          res => {
            this.teams = res;
          },
          err => {
            console.log(err);
          }
        );
    }
  }
}
