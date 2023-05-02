import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  errors: string = '';
  isError = false;

  constructor(private authenticationService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    if(f.valid){
      this.login(f.value);
    }else{
      this.errors = 'Au moins un champ obligatoire n\'est pas renseigné';
      this.isError = true;
    }
    
  }

  login(valueForm: JSON) {
      this.authenticationService
      .authenticate(valueForm)
          .subscribe({
            next: (data: any) => {
              console.log(data);
              localStorage.setItem('id_token', data.token);
              
            },
            error: (err: any) => {
              if(err.error.code == '401'){
                this.errors = 'Le login ou le mot de passe sont incorects';
                this.isError = true;
              }
              //console.error('Observer got an error: ' + err.error.code),
            },
            complete: () => {
              this.router.navigate(['tasks']);
              //console.log(this.authenticationService.getUser());
            }
          });
    }

}
