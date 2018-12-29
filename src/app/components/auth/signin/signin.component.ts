import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    this.authService.signinUser(email, password)
    .subscribe(
      data => {
        
        let jwt = data['token'];
        let jwtData = jwt.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);

        this.authService.currentlyLoggedInUser = decodedJwtData.sub;
        this.authService.token = data['token'];

        localStorage.setItem('token', data['token']);
      },
      error => console.log(error)
    );
  }

}
