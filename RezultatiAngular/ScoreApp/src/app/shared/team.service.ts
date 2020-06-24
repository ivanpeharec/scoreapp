import { Injectable } from '@angular/core';
import { Team } from './team.model';
import { HttpClient } from '@angular/common/http';
import { Attachment } from './attachment.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  readonly rootURL = 'https://localhost:44327/api/Teams/';
  readonly attachmentsURL = 'https://localhost:44327/api/Attachments/';

  attachments: Attachment[];

  form: FormGroup = new FormGroup({
    ID: new FormControl(0),
    SportID: new FormControl(null, Validators.required),
    Name: new FormControl(null, Validators.required)
  });

  competitionTeamForm: FormGroup = new FormGroup({
    TeamID: new FormControl(0),
    CompetitionID: new FormControl(null, Validators.required),
    Active: new FormControl(null)
  });

  constructor(private http: HttpClient) { }

  postTeam() {
    let body = {
      SportID: this.form.value.SportID,
      Name: this.form.value.Name
    }

    return this.http.post(this.rootURL, body);
  }

  putTeam() {
    let teamID = this.form.value.ID;
    let body = {
      ID: teamID,
      SportID: this.form.value.SportID,
      Name: this.form.value.Name
    }

    return this.http.put(this.rootURL + teamID, body);
  }

  getTeam(id: number) {
    return this.http.get(this.rootURL + id);
  }

  getTeams() {
    return this.http.get<Team[]>(this.rootURL);
  }

  // Gets all teams for the selected competition.
  getTeamsByCompetition(competitionID: number) {
    return this.http.get<Team[]>(this.rootURL + 'teamsByCompetition/' + competitionID);
  }

  // Gets all teams for the selected sport.
  getTeamsBySport(sportID: number) {
    return this.http.get<Team[]>(this.rootURL + 'teamsBySport/' + sportID);
  }

  deleteTeam(id: number) {
    return this.http.delete(this.rootURL + id);
  }

  postTeamToCompetition() {
    var body = {
      TeamID: this.competitionTeamForm.value.TeamID,
      CompetitionID: this.competitionTeamForm.value.CompetitionID,
      Active: (this.competitionTeamForm.value.Active == null || this.competitionTeamForm.value.Active == false) ? false : true
    };

    return this.http.post(this.rootURL + 'addTeamToCompetition', body);
  }

  uploadImage(formData: FormData, teamId: number) {
    return this.http.post(this.rootURL + 'upload/' + teamId, formData);
  }

  updateImagePath(formData: FormData, teamId: number) {
    return this.http.put(this.rootURL + 'updateLogo/' + teamId, formData);
  }

  // Gets image path.
  getImage(teamId: number) {
    return this.http.get(this.rootURL + 'uploads/' + teamId);
  }

  // Gets team emblems.
  getAllAttachments() {
    this.http.get(this.attachmentsURL)
      .toPromise()
      .then(res => this.attachments = res as Attachment[]);
  }
}
