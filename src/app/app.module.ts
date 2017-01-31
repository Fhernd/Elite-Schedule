import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
import { AgmCoreModule } from 'angular2-google-maps/core';

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
  TeamsPage
} from '../pages/teams/teams';
import {
  TeamDetailPage
} from '../pages/team-detail/team-detail';
import {
  StandingsPage
} from '../pages/standings/standings';
import {
  TeamHomePage
} from '../pages/team-home/team-home';
import{
  GamePage
} from '../pages/game/game';
import {
  MapPage
} from '../pages/map/map';

/**
 * Services
 */
import {
  EliteApi
} from './services/elite-api.service';
import {
  UserSettingsService
} from './services/user-settings.service';

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    StandingsPage,
    TeamHomePage,
    GamePage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBbsOlMryAHu2ESwHHSwrDBIUU7fiENNoM'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    StandingsPage,
    TeamHomePage,
    GamePage,
    MapPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, EliteApi, UserSettingsService, Storage]
})
export class AppModule {}
