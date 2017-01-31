import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

/**
 * Pages
 */
import {
  MyTeamsPage
} from '../pages/my-teams/my-teams.page';
import {
  TournamentsPage
} from '../pages/tournaments/tournaments';
import {
  TeamHomePage
} from '../pages/team-home/team-home';

/**
 * Services
 */
import {
  UserSettingsService
} from './services/user-settings.service';
import {
  EliteApi
} from './services/elite-api.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any = MyTeamsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
    private userSettingsService: UserSettingsService,
    private loadingController: LoadingController,
    private eliteApi: EliteApi, 
    private events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'My Teams', component: MyTeamsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.refreshFavorites();

      this.events.subscribe('favorites:changed', () => {
        this.refreshFavorites()
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToTournaments(){
    this.nav.push(TournamentsPage)
  }

  goHome(){
    this.nav.push(MyTeamsPage);
  }

  refreshFavorites(){
    this.favoriteTeams = this.userSettingsService.getAllFavorites();
  }

  goToTeam(favorite){
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });

    loader.present();

    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => {
      this.nav.push(TeamHomePage, favorite.team);
    })
  }
}
