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
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TeamsPerCompetitionComponent } from './teams-per-competition/teams-per-competition.component';
import { CompetitionsPerSportComponent } from './competitions-per-sport/competitions-per-sport.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'matches/all', component: MatchesComponent, canActivate: [AuthGuard] },
  { path: 'new-match', component: MatchComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'edit-match/:id', component: MatchComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'matches/football', component: FootballmatchesComponent, canActivate: [AuthGuard] },
  { path: 'matches/basketball', component: BasketballmatchesComponent, canActivate: [AuthGuard] },
  { path: 'matches/icehockey', component: IcehockeymatchesComponent, canActivate: [AuthGuard] },
  { path: 'sports', component: SportsComponent, canActivate: [AuthGuard] },
  { path: 'new-sport', component: SportComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'edit-sport/:id', component: SportComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'competitions', component: CompetitionsComponent, canActivate: [AuthGuard] },
  { path: 'new-competition', component: CompetitionComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'edit-competition/:id', component: CompetitionComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
  { path: 'new-team', component: TeamComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'edit-team/:id', component: TeamComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'teams-per-competition/:id', component: TeamsPerCompetitionComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  { path: 'competitions-per-sport/:id', component: CompetitionsPerSportComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
