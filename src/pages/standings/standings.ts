import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


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
  Generated class for the Standings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html'
})
export class StandingsPage {

  allStandings: any[];
  standings: any[];
  team: any;
  divisionFilter: string = 'division';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi) { }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;

    // this.allStandings =
    //   _.chain(this.standings)
    //     .groupBy('division')
    //     .toPairs()
    //     .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    //     .value();

    this.allStandings = tourneyData.standings;

    this.filterDivision();
  }

  getHeader(record, recordIndex, records) {
    if (recordIndex === 0 || record.division !== records[recordIndex - 1].division) {
      return record.division;
    } else {
      return null;
    }
  }

  filterDivision() {
    if (this.divisionFilter === 'all') {
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }

  }
}
