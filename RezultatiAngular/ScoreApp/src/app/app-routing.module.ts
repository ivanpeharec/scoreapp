import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchesComponent } from './matches/matches.component';
import { SportsComponent } from './sports/sports.component';
import { SportComponent } from './sports/sport/sport.component';
import { CompetitionsComponent } from './competitions/competitions.component'
import { CompetitionComponent } from './competitions/competition/competition.component'
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './teams/team/team.component';
import { MatchComponent } from './matches/match/match.component';
import { FootballmatchesComponent } from './matches/footballmatches/footballmatches.component';
import { BasketballmatchesComponent } from './matches/basketballmatches/basketballmatches.component';
import { IcehockeymatchesComponent } from './matches/icehockeymatches/icehockeymatches.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TeamsPerCompetitionComponent } from './teams-per-competition/teams-per-competition.component';
import { CompetitionsPerSportComponent } from './competitions-per-sport/competitions-per-sport.component';

const routes: Routes = [
  { path: '', component: FootballmatchesComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'matches/all', component: MatchesComponent, canActivate: [AuthGuard] },
  { path: 'new-match', component: MatchComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'edit-match/:id', component: MatchComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'matches/football', component: FootballmatchesComponent },
  { path: 'matches/basketball', component: BasketballmatchesComponent },
  { path: 'matches/icehockey', component: IcehockeymatchesComponent },
  { path: 'sports', component: SportsComponent },
  { path: 'new-sport', component: SportComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'edit-sport/:id', component: SportComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'competitions', component: CompetitionsComponent },
  { path: 'new-competition', component: CompetitionComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'edit-competition/:id', component: CompetitionComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'teams', component: TeamsComponent },
  { path: 'new-team', component: TeamComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'edit-team/:id', component: TeamComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'teams-per-competition/:id', component: TeamsPerCompetitionComponent },
  { path: 'competitions-per-sport/:id', component: CompetitionsPerSportComponent },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
