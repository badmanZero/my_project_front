import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mon projet';

  constructor(private router: Router, private authenticationService: AuthentificationService){}

  public ngOnInit() {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        if (events.url === '/') {
          this.title = "Accueil";
        } else if(events.url === '/movies') {
          this.title = "Films";
        } else if(events.url === '/tasks') {
          this.title = "Tâches";
        } else if(events.url === '/login') {
          this.title = "Login";
        } else {
          this.title = "Mon projet";
        }
      }
    });
  }

  hasAuthToken() {
      return localStorage.getItem('id_token') !== null;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  };

}
