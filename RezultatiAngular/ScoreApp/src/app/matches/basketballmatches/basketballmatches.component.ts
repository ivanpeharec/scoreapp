import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/shared/match.service';
import { TeamService } from 'src/app/shared/team.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-basketballmatches',
  templateUrl: './basketballmatches.component.html',
  styleUrls: ['./basketballmatches.component.css']
})
export class BasketballmatchesComponent implements OnInit {

  constructor(private service: MatchService,
    private teamService: TeamService,
    private userService: UserService) { }

  matches: any;

  teams: any;

  loading = false;

  ngOnInit() {
    this.service.getMatchesBySport(2)
      .subscribe(m => {
        this.matches = m;
      });

    this.teamService.getTeams()
      .subscribe(t => {
        this.teams = t;
        this.loading = true;
      });
  }

  getTeamName(id: number){
    return this.teams.find(item => item.ID === id).Name;
  }

}
