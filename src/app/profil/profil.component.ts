import { Component, OnInit } from '@angular/core';
import { AuthentificationService, Info } from '../authentification.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  infoUser: any
  constructor(private authenticationService: AuthentificationService) { }

  ngOnInit(): void {
    let token = this.authenticationService.getUser();
    this.authenticationService.getInfoUser(token.username)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        this.infoUser = data;
      },
      error: (err: any) => {
        //console.error('Observer got an error: ' + err.error.code),
      },
      complete: () => {
        //console.log(this.authenticationService.getUser());
      }
    })
    
  }

}
