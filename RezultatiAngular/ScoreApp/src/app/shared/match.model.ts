import { Team } from './team.model';
import { FootballMatchComponents } from './football-match-components.model';
import { BasketballMatchComponents } from './basketball-match-components.model';
import { IceHockeyMatchComponents } from './ice-hockey-match-components.model';

export class Match {
    ID : number;
    Date : Date;
    SportID : number;
    CompetitionID : number;
    HomeTeamID : number;
    AwayTeamID : number;
    HomeTeam: Team;
    AwayTeam: Team;
    FootballMatchComponents: FootballMatchComponents;
    BasketballMatchComponents: BasketballMatchComponents;
    IceHockeyMatchComponents: IceHockeyMatchComponents;
}
