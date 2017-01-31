import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Pages
 */
import {
  TeamHomePage
} from '../team-home/team-home';

/**
 * Services
 */
import {
  EliteApi
} from '../../app/services/elite-api.service';

/**
 * Utilities
 */
import * as _ from 'lodash';

/*
  Generated class for the Teams page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {

  private allTeams: any;
  private allTeamDivisions: any;
  teams = [];
  queryText: string = '';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteApi: EliteApi,
              private loadingController: LoadingController) {}

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting data...'
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(
      data => {
        this.allTeams = data.teams;
        this.allTeamDivisions = 
          _.chain(data.teams)
          .groupBy('division')
          .toPairs()
          .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
          .value();

        this.teams = this.allTeamDivisions;
        console.log('division teams', this.teams);
        loader.dismiss();
      }
    );
    });
  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }

  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });

    this.teams = filteredTeams;
  }
}
