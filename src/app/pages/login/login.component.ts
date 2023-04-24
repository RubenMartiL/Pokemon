import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { environment as environmentProd } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  baseUrl = (environment.production) ? environmentProd.baseUrl : environment.baseUrl;
  backendUrl = (environment.production) ? environmentProd.backendUrl : environment.backendUrl;

  nickname: string = '';
  password: string = '';
  error: string = '';

  constructor(private router : Router){}

  login = () => {
    const myInit = {
      method: 'POST',
      body: JSON.stringify({nickname: this.nickname, password: this.password}) 
    }
    fetch(this.backendUrl+'login.php', myInit)
      .then(response => response.json())
      .then(data => {
        if(data) {
          localStorage.setItem("login",this.nickname);
          this.router.navigate([this.baseUrl+'/game']);
        }else{
          this.error = 'The nickname or password is not correct.';
        }
      })
  }

  register = () => {
    this.router.navigate([this.baseUrl+'/register']);
  }
}
