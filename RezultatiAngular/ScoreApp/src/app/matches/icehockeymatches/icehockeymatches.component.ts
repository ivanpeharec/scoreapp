import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/shared/match.service';
import { TeamService } from 'src/app/shared/team.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-icehockeymatches',
  templateUrl: './icehockeymatches.component.html',
  styleUrls: ['./icehockeymatches.component.css']
})
export class IcehockeymatchesComponent implements OnInit {

  constructor(private service: MatchService,
    private teamService: TeamService,
    private userService: UserService) { }

  matches: any;

  teams: any;

  loading = false;

  ngOnInit() {
    this.service.getMatchesBySport(3)
      .subscribe(m => {
        this.matches = m;
      });

    this.teamService.getTeams()
      .subscribe(t => {
        this.teams = t;
        this.loading = true;
      });
  }

  getTeamName(id: number) {
    return this.teams.find(item => item.ID === id).Name;
  }
}
