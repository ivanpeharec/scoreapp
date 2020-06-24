import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgTempusdominusBootstrapModule } from 'ngx-tempusdominus-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchComponent } from './matches/match/match.component';
import { MatchService } from './shared/match.service';
import { SportService } from './shared/sport.service';
import { SportsComponent } from './sports/sports.component';
import { SportComponent } from './sports/sport/sport.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { CompetitionComponent } from './competitions/competition/competition.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './teams/team/team.component';
import { TeamService } from './shared/team.service';
import { CompetitionService } from './shared/competition.service';
import { FootballmatchesComponent } from './matches/footballmatches/footballmatches.component';
import { BasketballmatchesComponent } from './matches/basketballmatches/basketballmatches.component';
import { IcehockeymatchesComponent } from './matches/icehockeymatches/icehockeymatches.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { MaterialModule } from './material/material.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TeamsPerCompetitionComponent } from './teams/teams-per-competition/teams-per-competition.component';
import { CompetitionsPerSportComponent } from './competitions/competitions-per-sport/competitions-per-sport.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MatchesComponent,
    MatchComponent,
    SportsComponent,
    SportComponent,
    CompetitionsComponent,
    CompetitionComponent,
    TeamsComponent,
    TeamComponent,
    FootballmatchesComponent,
    BasketballmatchesComponent,
    IcehockeymatchesComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    ForbiddenComponent,
    MatConfirmDialogComponent,
    NotFoundComponent,
    TeamsPerCompetitionComponent,
    CompetitionsPerSportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      positionClass: 'toast-bottom-right'
    }),
    NgbModule,
    NgTempusdominusBootstrapModule,
    ReactiveFormsModule,
    MaterialModule,
    MatMomentDateModule
  ],
  providers: [
    MatchService,
    SportService,
    TeamService,
    CompetitionService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent]
})
export class AppModule { }
