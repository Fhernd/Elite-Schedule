import {
    Component
} from '@angular/core';
import {
    NavController, LoadingController
} from 'ionic-angular';

/**
 * Pages
 */
import {
    TournamentsPage
} from '../tournaments/tournaments'; 
import {
    TeamHomePage
} from '../team-home/team-home';

/**
 * Services
 */
import {
  EliteApi
} from '../../app/services/elite-api.service';
import {
  UserSettingsService
} from '../../app/services/user-settings.service';

@Component({
    selector: 'my-teams',
    templateUrl: 'my-teams.page.html'
})
export class MyTeamsPage{

    favorites = [];
    //     {
    //         team: {
    //             id: 6182, 
    //             name: 'HC Elite 7th', 
    //             coach: 'Michelotti'
    //         },
    //         tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
    //         tournamentName: 'March Madness Tournament'
    //     },
    //     {
    //         team: {
    //             id: 805, 
    //             name: 'HC Elite', 
    //             coach: 'Michelotti'
    //         },
    //         tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
    //         tournamentName: 'Holiday Hoops Challenge'
    //     }
    // ];

    constructor(private navCtrl: NavController, 
                private loadingController: LoadingController,
                private eliteApi: EliteApi,
                private userSettings:UserSettingsService){
        
    }

    goToTournaments(){
        this.navCtrl.push(TournamentsPage);
    }

    favoriteTapped($event, favorite){
        let loader = this.loadingController.create({
            content: 'Getting data...',
            dismissOnPageChange: true
        });

        loader.present();
        this.eliteApi.getTournamentData(favorite.tournamentId)
            .subscribe( t => this.navCtrl.push(TeamHomePage, favorite.team));
    }

    ionViewDidEnter(){
        this.favorites = this.userSettings.getAllFavorites();
    }
}